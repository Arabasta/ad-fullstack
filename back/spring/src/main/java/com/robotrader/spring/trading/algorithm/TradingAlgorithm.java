package com.robotrader.spring.trading.algorithm;

import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;
import com.robotrader.spring.utils.DateTimeUtil;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public abstract class TradingAlgorithm {
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
    protected BigDecimal capitalTest;
    protected boolean isTest;
    protected final BigDecimal HIGH_PRICE_THRESHOLD = BigDecimal.valueOf(10000);
    protected TradeTransaction lastTradeTransaction;

    public TradingAlgorithm(String ticker, PortfolioTypeEnum portfolioType, MoneyPoolService moneyPoolService) {
        this.ticker = ticker;
        this.portfolioType = portfolioType;
        this.moneyPoolService = moneyPoolService;
        capitalTest = BigDecimal.valueOf(1000000);
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

    public void executeBackTest() {
        isTest = true;
        System.out.println("------ Back Test Execution ------");

        boolean sellSignal = checkForSellSignal();
        System.out.println("Sell signal: " + sellSignal);

        if (sellSignal) {
            executeTradeBackTest("SELL");
            return; // Allow only 1 trade per execution.
        }

        boolean buySignal = checkForBuySignal();
        System.out.println("Buy signal: " + buySignal);

        if (buySignal) {
            executeTradeBackTest("BUY");
        }

        System.out.println("Current price: " + currentPrice);
        System.out.println("Profit target: " + profitTarget);
        System.out.println("Stop loss: " + stopLossPrice);
    }

    public void executeLiveTrade() {
        isTest = false;
        System.out.println("------ Live Trade Execution ------");

        boolean sellSignal = checkForSellSignal();
        System.out.println("Sell signal: " + sellSignal);

        if (sellSignal) {
            executeTradeLive("SELL");
            return; // Allow only 1 trade per execution.
        }

        // TODO: temporarily set to always true if tradeable, pending price predictions
        checkForBuySignal();
        boolean buySignal = false;
        if (isTradeable()) { buySignal = true; }
        // TODO: temporarily set to always true if tradeable, pending price predictions

        System.out.println("Buy signal: " + buySignal);

        if (buySignal) {
            executeTradeLive("BUY");
        }

        System.out.println("Current price: " + currentPrice);
        System.out.println("Profit target: " + profitTarget);
        System.out.println("Stop loss: " + stopLossPrice);
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
        if (totalCost.compareTo(capitalTest) > 0) { //TODO: use money pool for live trading
            System.out.println("Position: " + position);
            System.out.println("Not enough capital for the trade. Required: " + totalCost + ", Available: " + capitalTest);
            return false;
        }
        return true;
    }

    public void executeTradeBackTest(String action) {
        ZonedDateTime dt = DateTimeUtil.convertTimestampToZonedDateTime((Long) priceHistory.get("timestamp").get(0));
        BigDecimal currentPrice = (BigDecimal) priceHistory.get("close").get(0);

        lastTradeTransaction = new TradeTransaction(ticker, dt, position, currentPrice, action);
        if (action.equals("BUY")) {
            capitalTest = capitalTest.subtract(currentPrice.multiply(position));
        }
        else {
            capitalTest = capitalTest.add(currentPrice.multiply(position));
        }

        System.out.println("Trade: " + lastTradeTransaction);
        System.out.println("Capital:" + capitalTest);
    }

    public void executeTradeLive(String action) {
        ZonedDateTime dt = ZonedDateTime.now();
        lastTradeTransaction = new TradeTransaction(ticker, dt, position, currentPrice, action);

        // TODO: replace below to use moneypool instead of capitalTest
        if (action.equals("BUY")) {
            capitalTest = capitalTest.subtract(currentPrice.multiply(position));
        }
        else {
            capitalTest = capitalTest.add(currentPrice.multiply(position));
        }
        System.out.println("Trade: " + lastTradeTransaction);
        System.out.println("Capital:" + capitalTest);
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
