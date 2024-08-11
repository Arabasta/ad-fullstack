package com.robotrader.spring.trading.algorithm.base;

import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;
import com.robotrader.spring.utils.DateTimeUtil;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.math.RoundingMode;
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
    protected BigDecimal baseAlgoRisk;
    protected static final BigDecimal AGGRESSIVE_RISK = BigDecimal.valueOf(0.001);
    protected static final BigDecimal MODERATE_RISK = BigDecimal.valueOf(0.0005);
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
    private boolean liveTradeBuySignalTrigger;
    private static final Logger logger = LoggerFactory.getLogger(TradingAlgorithmBase.class);

    public TradingAlgorithmBase(String ticker, PortfolioTypeEnum portfolioType, MoneyPoolService moneyPoolService) {
        this.ticker = ticker;
        this.portfolioType = portfolioType;
        this.moneyPoolService = moneyPoolService;
        currentCapitalTest = BigDecimal.valueOf(1000000);
        initialCapitalTest = currentCapitalTest;
        setBaseAlgoRisk(portfolioType);
    }

    public void setBaseAlgoRisk(PortfolioTypeEnum portfolioType) {
        switch (portfolioType) {
            case AGGRESSIVE -> baseAlgoRisk = AGGRESSIVE_RISK;
            case MODERATE -> baseAlgoRisk = MODERATE_RISK;
            case CONSERVATIVE -> baseAlgoRisk = CONSERVATIVE_RISK;
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
            logger.info("------ Back Test Execution for {} ------", ticker);
        } else {
            this.isTest = false;
            logger.info("------ Live Trade Execution {} ------", ticker);
        }

        boolean sellSignal = checkForSellSignal();
        logger.debug("{} - Sell signal: {}", ticker, sellSignal);

        if (sellSignal && isTest) {
            executeTradeBackTest("SELL");
            return; // Allow only 1 trade per execution.
        } else if (sellSignal) {
            executeTradeLive("SELL");
            return; // Allow only 1 trade per execution.
        }

        boolean buySignal;

        if (isTest) {
            buySignal = checkForBuySignal();
            logger.debug("{} - Buy signal: {}", ticker, buySignal);
            if (buySignal) {
                executeTradeBackTest("BUY");
            }

        } else {
            if (liveTradeBuySignalTrigger) {
                buySignal = checkForBuySignal();
                logger.debug("{} - Buy signal: {}", ticker, buySignal);
                if (buySignal) {
                    executeTradeLive("BUY");
                }
                liveTradeBuySignalTrigger = false; // Reset trigger until next time interval from buy signal event publisher
            }
        }


        logger.debug("{} - Current price: {}", ticker, currentPrice);
        logger.debug("{} - Profit target: {}", ticker, profitTarget);
        logger.debug("{} - Stop loss: {}", ticker, stopLossPrice);
    }

    // Risk management. max trades/day, enough capital to buy position
    public boolean isTradeable(){
        // Check if already have an open buy trade
        if (openTrade()) {
            logger.info("There is an open trade");
            return false;
        }

        // Calculate the position size
        position = positionSizing(baseAlgoRisk);
        logger.info("Calculated position size: {}", position);
        if (position.equals(BigDecimal.ZERO)) {
            logger.info("Insufficient capital");
            return false;
        }
        // Calculate the total cost of the trade
        BigDecimal totalCost = currentPrice.multiply(position);

        // Check if there's enough capital for the trade
        BigDecimal poolBalance = moneyPoolService.findByPortfolioType(portfolioType).getPoolBalance();
        logger.debug("{} - Total cost: {}", ticker, totalCost);
        logger.debug("{} - Pool balance: {}", portfolioType, poolBalance);
        if (isTest && totalCost.compareTo(currentCapitalTest) > 0 || !isTest && totalCost.compareTo(poolBalance) > 0) {
            logger.info("{} - Not enough capital for the trade. Required: {}, Available: {}", ticker, totalCost, currentCapitalTest);
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
        logger.debug("New Capital:{}", currentCapitalTest);
    }

    public void executeTradeLive(String action) {
        LocalDateTime dt = LocalDateTime.now();
        lastTradeTransaction = new TradeTransaction(ticker, dt, position, currentPrice, action, portfolioType);
        BigDecimal initialBalance = moneyPoolService.findByPortfolioType(portfolioType).getPoolBalance();
        BigDecimal newBalance = moneyPoolService.updateTrade(lastTradeTransaction);

        logger.debug("Trade: {}", lastTradeTransaction);
        logger.debug("Initial Capital:{}", initialBalance);
        logger.debug("New Capital:{}", newBalance);
    }

    public boolean isSellable() {
        return openTrade();
    }

    // Stop loss
    public boolean isStopLossTriggered(BigDecimal currentPrice) {
        return currentPrice.compareTo(stopLossPrice) < 0;
    }

    public boolean openTrade() {
        // Only allow 1 open trade per stock
        return lastTradeTransaction != null && lastTradeTransaction.getAction().equals("BUY");
    }

    public BigDecimal calculateAdjustedRisk(BigDecimal baseRisk, BigDecimal stopLossAmount, BigDecimal currentPrice) {
        BigDecimal stopLossPercentage = stopLossAmount.divide(currentPrice, 8, RoundingMode.HALF_UP);

        if (stopLossPercentage.compareTo(BigDecimal.valueOf(0.005)) < 0) { // If stop loss is less than 0.5%
            return baseRisk.multiply(BigDecimal.valueOf(0.2)); // Reduce risk to 20% of base risk
        } else if (stopLossPercentage.compareTo(BigDecimal.valueOf(0.01)) < 0) { // If stop loss is less than 1%
            return baseRisk.multiply(BigDecimal.valueOf(0.4)); // Reduce risk to 40% of base risk
        } else if (stopLossPercentage.compareTo(BigDecimal.valueOf(0.02)) < 0) { // If stop loss is less than 2%
            return baseRisk.multiply(BigDecimal.valueOf(0.6)); // Reduce risk to 60% of base risk
        } else if (stopLossPercentage.compareTo(BigDecimal.valueOf(0.03)) < 0) { // If stop loss is less than 3%
            return baseRisk.multiply(BigDecimal.valueOf(0.8)); // Reduce risk to 80% of base risk
        }

        return baseRisk; // Otherwise, use the base risk
    }

    public boolean stopLiveTrade() {
        if (lastTradeTransaction != null && lastTradeTransaction.getAction().equals("BUY")) {
            executeTradeLive("SELL");
            return true;
        }
        return false;
    }

}
