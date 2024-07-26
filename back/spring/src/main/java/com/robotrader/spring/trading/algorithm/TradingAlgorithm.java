package com.robotrader.spring.trading.algorithm;

import com.robotrader.spring.dto.TradeTransaction;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public abstract class TradingAlgorithm {
    @Getter
    @Setter
    protected List<BigDecimal> pricePredictions;
    @Getter
    @Setter
    protected Map<String,List<Object>> priceHistory;
    protected String ticker;
    @Getter
    protected PortfolioTypeEnum portfolioType;
    protected final MoneyPoolService moneyPoolService;
    @Getter
    protected List<TradeTransaction> tradeTransactions;
    protected static final BigDecimal AGGRESSIVE_RISK = BigDecimal.valueOf(0.03);
    protected static final BigDecimal MODERATE_RISK = BigDecimal.valueOf(0.02);
    protected static final BigDecimal CONSERVATIVE_RISK = BigDecimal.valueOf(0.01);
    protected Integer position;
    protected BigDecimal currentPrice;
    protected BigDecimal stopLoss;
    protected BigDecimal profitTarget;
    protected BigDecimal capitalTest;
    protected boolean isTest;

    public TradingAlgorithm(String ticker, PortfolioTypeEnum portfolioType, MoneyPoolService moneyPoolService) {
        this.ticker = ticker;
        this.portfolioType = portfolioType;
        this.moneyPoolService = moneyPoolService;
        tradeTransactions = new ArrayList<>();
        capitalTest = BigDecimal.valueOf(1000000);
    }

    public abstract boolean checkForBuySignal();

    public abstract boolean checkForSellSignal();

    // Position Sizing
    public abstract Integer positionSizing(BigDecimal risk);

    // Determining stop loss
    public abstract BigDecimal calculateStopLoss(BigDecimal currentPrice);

    public void executeBackTest() {
        isTest = true;
        if (checkForSellSignal()) {
            executeSellTradeBackTest();
            System.out.println("Sell signal: " + true);
            return; // Allow only 1 trade per execution.
        } else {
            System.out.println("Sell signal: " + false);
        }
        if (checkForBuySignal()) {
            executeBuyTradeBackTest();
            System.out.println("Buy signal: " + true);
        }
        else {
            System.out.println("Buy signal: " + false);
        }
    }

    public void executeLiveTrade() {
        isTest = false;
    }

    // Risk management. max trades/day, prediction confidence level, enough capital to buy position
    public boolean isTradeable(){
        // Check if already have an open buy trade
        if (openTrade()) {
            return false;
        }

//        position = positionSizing(AGGRESSIVE_RISK);
        return true;
    }

    // Buy trade
    public void executeBuyTradeBackTest(){
        Long timestamp = (Long) priceHistory.get("timestamp").get(0);
        BigDecimal currentPrice = (BigDecimal) priceHistory.get("close").get(0);

        TradeTransaction tradeTransaction = new TradeTransaction(ticker, timestamp, position, currentPrice, "BUY");
        tradeTransactions.add(tradeTransaction);
    }
    public void executeBuyTradeLive(){
        // Call API for live price
        // Store in S3
    }

    // Sell trade
    public void executeSellTradeBackTest(){
        Long timestamp = (Long) priceHistory.get("timestamp").get(0);
        BigDecimal currentPrice = (BigDecimal) priceHistory.get("close").get(0);

        TradeTransaction tradeTransaction = new TradeTransaction(ticker, timestamp, position, currentPrice, "SELL");
        tradeTransactions.add(tradeTransaction);
    }
    public void executeSellTradeLive(){
        // Call API for live price
        // Store in S3
    }

    public boolean isSellable(){
        return openTrade();
    }

    // Stop loss
    public boolean isStopLossTriggered(BigDecimal currentPrice) {
            if (currentPrice.compareTo(stopLoss) < 0){
                return true;
            }
        return false;
    }

    protected boolean openTrade() {
        // Only allow 1 open trade per stock
        if (tradeTransactions != null) {
            return tradeTransactions.size() % 2 != 0;
        }
        return false;
    }
}
