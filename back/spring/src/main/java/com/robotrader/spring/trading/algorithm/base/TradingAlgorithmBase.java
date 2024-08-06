package com.robotrader.spring.trading.algorithm.base;

import com.robotrader.spring.model.MoneyPool;
import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;
import com.robotrader.spring.utils.DateTimeUtil;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public abstract class TradingAlgorithmBase {
    protected List<BigDecimal> pricePredictions;
    protected Map<String,List<Object>> priceHistory;
    protected String ticker;
    protected final MoneyPoolService moneyPoolService;
    protected PortfolioTypeEnum portfolioType;
    protected BigDecimal algoRisk;
    protected static final BigDecimal AGGRESSIVE_RISK = BigDecimal.valueOf(0.0005);
    protected static final BigDecimal MODERATE_RISK = BigDecimal.valueOf(0.0003);
    protected static final BigDecimal CONSERVATIVE_RISK = BigDecimal.valueOf(0.0001);
    protected BigDecimal position;
    protected BigDecimal currentPrice;
    protected BigDecimal stopLossPrice;
    protected BigDecimal stopLossAmount;
    protected BigDecimal profitTarget;
    protected BigDecimal initialCapitalTest;
    protected BigDecimal currentCapitalTest;
    protected boolean isTest;
    protected final BigDecimal HIGH_PRICE_THRESHOLD = BigDecimal.valueOf(10000);
    protected TradeTransaction lastTradeTransaction;
    private static final Logger logger = LoggerFactory.getLogger(TradingAlgorithmBase.class);

    public TradingAlgorithmBase(String ticker, PortfolioTypeEnum portfolioType, MoneyPoolService moneyPoolService) {
        this.ticker = ticker;
        this.portfolioType = portfolioType;
        this.moneyPoolService = moneyPoolService;
        currentCapitalTest = BigDecimal.valueOf(1000000);
        initialCapitalTest = currentCapitalTest;
        setAlgoRisk(portfolioType);
    }

    public void setAlgoRisk(PortfolioTypeEnum portfolioType) {
        switch (portfolioType) {
            case AGGRESSIVE -> algoRisk = AGGRESSIVE_RISK;
            case MODERATE -> algoRisk = MODERATE_RISK;
            case CONSERVATIVE -> algoRisk = CONSERVATIVE_RISK;
        }
    }

    public abstract boolean checkForBuySignal();

    public abstract boolean checkForSellSignal();

    // Position Sizing
    public abstract BigDecimal positionSizing(BigDecimal risk);

    // Determining stop loss
    public abstract BigDecimal calculateStopLossPrice(BigDecimal currentPrice);

    public void execute(boolean isTest) {
        if (isTest) {
            this.isTest = true;
            logger.info("------ Back Test Execution ------");
        } else {
            this.isTest = false;
            logger.info("------ Live Trade Execution ------");
        }

        boolean sellSignal = checkForSellSignal();
        logger.debug("Sell signal: {}", sellSignal);

        if (sellSignal && isTest) {
            executeTradeBackTest("SELL");
            return; // Allow only 1 trade per execution.
        } else if (sellSignal && !isTest) {
            executeTradeLive("SELL");
            return; // Allow only 1 trade per execution.
        }

        boolean buySignal = false;
        if (!isTest) {
            // TODO: temporarily set to always true if tradeable, pending price predictions
            checkForBuySignal();

            if (isTradeable()) { buySignal = true; }
            // TODO: temporarily set to always true if tradeable, pending price predictions. Should be just buySignal = checkForBuySignal();
        } else {
            buySignal = checkForBuySignal();
        }
        logger.debug("Buy signal: {}", buySignal);

        if (buySignal && isTest) {
            executeTradeBackTest("BUY");
        } else if (buySignal && !isTest) {
            executeTradeLive("BUY");
        }

        logger.debug("Current price: {}", currentPrice);
        logger.debug("Profit target: {}", profitTarget);
        logger.debug("Stop loss: {}", stopLossPrice);
    }

    // Risk management. max trades/day, prediction confidence level, enough capital to buy position
    public boolean isTradeable(){
        // Check if already have an open buy trade
        if (openTrade()) {
            return false;
        }

        // Calculate the position size
        position = positionSizing(algoRisk);
        if (position.equals(BigDecimal.ZERO)) {
            return false;
        }
        // Calculate the total cost of the trade
        BigDecimal totalCost = currentPrice.multiply(position);

        // Check if there's enough capital for the trade
        BigDecimal poolBalance = moneyPoolService.findByPortfolioType(portfolioType).getPoolBalance();
        if (isTest && totalCost.compareTo(currentCapitalTest) > 0 || !isTest && totalCost.compareTo(poolBalance) > 0) {
            logger.debug("Position: {}", position);
            logger.debug("Not enough capital for the trade. Required: {}, Available: {}", totalCost, currentCapitalTest);
            return false;
        }
        return true;
    }

    public void executeTradeBackTest(String action) {
        LocalDateTime dt = DateTimeUtil.convertTimestampToLocalDateTime((Long) priceHistory.get("timestamp").get(0));
        BigDecimal currentPrice = (BigDecimal) priceHistory.get("close").get(0);

        lastTradeTransaction = new TradeTransaction(ticker, dt, position, currentPrice, action, portfolioType);
        BigDecimal transactionAmount = currentPrice.multiply(position);
        if (action.equals("BUY")) {
            transactionAmount = transactionAmount.negate();
        }
        currentCapitalTest = currentCapitalTest.add(transactionAmount);

        logger.debug("Trade: {}", lastTradeTransaction);
        logger.debug("Capital:{}", currentCapitalTest);
    }

    public void executeTradeLive(String action) {
        LocalDateTime dt = LocalDateTime.now();
        lastTradeTransaction = new TradeTransaction(ticker, dt, position, currentPrice, action, portfolioType);
        BigDecimal newBalance = null;
        if (action.equals("SELL")){
            newBalance = moneyPoolService.updateTrade(lastTradeTransaction);
        }

        logger.debug("Trade: {}", lastTradeTransaction);
        logger.debug("Capital:{}", newBalance);
    }

    public boolean isSellable() {
        return openTrade();
    }

    // Stop loss
    public boolean isStopLossTriggered(BigDecimal currentPrice) {
        return currentPrice.compareTo(stopLossPrice) < 0;
    }

    protected boolean openTrade() {
        // Only allow 1 open trade per stock
        return lastTradeTransaction != null && lastTradeTransaction.getAction().equals("BUY");
    }
}
