package com.robotrader.spring.trading;

import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.algorithm.TradingAlgorithm;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BackTesting {

    public BackTesting() {}

    public void run(TradingAlgorithm tradingAlgorithm, List<BigDecimal> pricePredictions, Map<String, List<Object>> stockDataHistory) {
        // Loop through price history and execute algo, simulating progress of time
        while (!pricePredictions.isEmpty()) {
            tradingAlgorithm.setPricePredictions(new ArrayList<>(pricePredictions));
            tradingAlgorithm.setPriceHistory(new HashMap<>(stockDataHistory));
            tradingAlgorithm.executeBackTest();
            pricePredictions.remove(0); // Remove the oldest price
            stockDataHistory.get("timestamp").remove(0);
            stockDataHistory.get("open").remove(0);
            stockDataHistory.get("close").remove(0);
            stockDataHistory.get("high").remove(0);
            stockDataHistory.get("low").remove(0);
        }
        List<TradeTransaction> trades = tradingAlgorithm.getTradeTransactions();
        TradeTransaction lastTrade = null;
        BigDecimal totalProfit = BigDecimal.ZERO;
        System.out.println("Trade Transactions: ");
        for (TradeTransaction trade : trades) {
            System.out.println(trade);
            if (trade.getAction().equals("SELL")) {
                BigDecimal profitPerQty = trade.getTransactionPrice().subtract(lastTrade.getTransactionPrice());
                BigDecimal subtotalProfit = profitPerQty.multiply(BigDecimal.valueOf(trade.getTransactionQuantity()));
                totalProfit = totalProfit.add(subtotalProfit);
                System.out.println("Profit: " + subtotalProfit);
            } else if (trade.getAction().equals("BUY")) {
                lastTrade = trade;
            }
        }
        System.out.println("Total Profit: " + totalProfit);
    }
}