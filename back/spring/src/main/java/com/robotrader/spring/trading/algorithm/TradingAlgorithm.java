package com.robotrader.spring.trading.algorithm;

import com.robotrader.spring.trading.dto.LiveMarketData;
import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;
import lombok.Getter;
import lombok.Setter;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;

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
    protected static final BigDecimal AGGRESSIVE_RISK = BigDecimal.valueOf(0.0005);
    protected static final BigDecimal MODERATE_RISK = BigDecimal.valueOf(0.0003);
    protected static final BigDecimal CONSERVATIVE_RISK = BigDecimal.valueOf(0.0001);
    protected BigDecimal position;
    protected BigDecimal currentPrice;
    protected BigDecimal stopLossPrice;
    protected BigDecimal stopLossAmount;
    protected BigDecimal profitTarget;
    @Getter
    @Setter
    protected BigDecimal capitalTest;
    protected boolean isTest;
    protected final BigDecimal HIGH_PRICE_THRESHOLD = BigDecimal.valueOf(10000);
    protected LiveMarketData latestMarketData;
    private Disposable dataSubscription;

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
    public abstract BigDecimal positionSizing(BigDecimal risk);

    // Determining stop loss
    public abstract BigDecimal calculateStopLossPrice(BigDecimal currentPrice);

    public void executeBackTest() {
        isTest = true;
        System.out.println("------ Back Test Execution ------");

        boolean sellSignal = checkForSellSignal();
        System.out.println("Sell signal: " + sellSignal);

        if (sellSignal) {
            executeSellTradeBackTest();
            return; // Allow only 1 trade per execution.
        }

        boolean buySignal = checkForBuySignal();
        System.out.println("Buy signal: " + buySignal);

        if (buySignal) {
            executeBuyTradeBackTest();
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
            executeSellTradeLive();
            return; // Allow only 1 trade per execution.
        }

        boolean buySignal = checkForBuySignal();
        System.out.println("Buy signal: " + buySignal);

        if (buySignal) {
            executeBuyTradeLive();
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
        position = positionSizing(AGGRESSIVE_RISK);
        if (position.equals(BigDecimal.ZERO)) {
            return false;
        }
        // Calculate the total cost of the trade
        BigDecimal totalCost = currentPrice.multiply(position);

        // Check if there's enough capital for the trade
        if (totalCost.compareTo(capitalTest) > 0) {
            System.out.println("Position: " + position);
            System.out.println("Not enough capital for the trade. Required: " + totalCost + ", Available: " + capitalTest);
            return false;
        }
        return true;
    }

    // Buy trade
    public void executeBuyTradeBackTest(){
        Long timestamp = (Long) priceHistory.get("timestamp").get(0);
        BigDecimal currentPrice = (BigDecimal) priceHistory.get("close").get(0);

        TradeTransaction tradeTransaction = new TradeTransaction(ticker, timestamp, position, currentPrice, "BUY");
        tradeTransactions.add(tradeTransaction);
        capitalTest = capitalTest.subtract(currentPrice.multiply(position));
        System.out.println("Trade: " + tradeTransaction);
        System.out.println("Capital:" + capitalTest);
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
        capitalTest = capitalTest.add(currentPrice.multiply(position));
        System.out.println("Trade: " + tradeTransaction);
        System.out.println("Capital:" + capitalTest);
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
            if (currentPrice.compareTo(stopLossPrice) < 0){
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

    public void subscribeToMarketData(Flux<LiveMarketData> liveMarketDataFlux) {
        dataSubscription = liveMarketDataFlux.subscribe(
                data -> {
                    this.latestMarketData = data;
                    if (latestMarketData.getTicker().equals(ticker)) {
                        currentPrice = latestMarketData.getC();
                    }
                    executeLiveTrade();
                },
                error -> System.err.println("Error in market data stream: " + error),
                () -> System.out.println("Market data stream completed")
        );
    }

    public void unsubscribeFromMarketData() {
        if (dataSubscription != null && !dataSubscription.isDisposed()) {
            dataSubscription.dispose();
        }
    }
}
