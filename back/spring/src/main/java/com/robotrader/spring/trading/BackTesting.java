package com.robotrader.spring.trading;

import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.algorithm.TradingAlgorithm;
import com.robotrader.spring.trading.service.MarketDataService;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class BackTesting {
    private final MarketDataService marketDataService;
    private TradingAlgorithm tradingAlgorithm;
    private List<BigDecimal> pricePredictions;
    @Setter
    private Map<String, List<Object>> marketDataHistory;

    public BackTesting(MarketDataService marketDataService) {
        this.marketDataService = marketDataService;
    }

    public void run(TradingAlgorithm tradingAlgorithm) {
        this.tradingAlgorithm = tradingAlgorithm;

        marketDataService.getHistoricalMarketData(processTicker(tradingAlgorithm.getTicker()))
                .doOnNext(this::setMarketDataHistory)
                .doOnNext(data -> getPricePredictions())
                .doOnNext(data -> runSimulation())
                .doOnNext(data -> saveTransaction())
                .subscribe(
                        data -> System.out.println("Backtesting completed successfully."),
                        error -> {
                            System.err.println("Error during backtesting: " + error.getMessage());
                            error.printStackTrace();
                        }
                );
    }

    // Polygon's API and websocket ticker format is different. eg. BTCUSD vs BTC-USD
    private String processTicker(String ticker) {
        return ticker.replace("-","");
    }

     public void runSimulation() {
        // Loop through price history and execute algo, simulating progress of time
        while (!pricePredictions.isEmpty()) {
            tradingAlgorithm.setPricePredictions(new ArrayList<>(pricePredictions));
            tradingAlgorithm.setPriceHistory(new HashMap<>(marketDataHistory));
            tradingAlgorithm.executeBackTest();
            pricePredictions.remove(0); // Remove the oldest price
            marketDataHistory.get("timestamp").remove(0);
            marketDataHistory.get("open").remove(0);
            marketDataHistory.get("close").remove(0);
            marketDataHistory.get("high").remove(0);
            marketDataHistory.get("low").remove(0);
        }
    }

    public void getPricePredictions() {
        List<Object> objects = marketDataHistory.get("close");
        pricePredictions = objects.stream()
                .map(price -> (BigDecimal) price)
                .collect(Collectors.toList()); //TODO: Predictions == history for now
    }

    public void saveTransaction() {
        List<TradeTransaction> trades = tradingAlgorithm.getTradeTransactions();
        TradeTransaction lastTrade = null;
        BigDecimal totalProfit = BigDecimal.ZERO;
        System.out.println("Trade Transactions: ");
        for (TradeTransaction trade : trades) {
            System.out.println(trade);
            if (trade.getAction().equals("SELL")) {
                BigDecimal profitPerQty = trade.getTransactionPrice().subtract(lastTrade.getTransactionPrice());
                BigDecimal subtotalProfit = profitPerQty.multiply(trade.getTransactionQuantity());
                totalProfit = totalProfit.add(subtotalProfit);
                System.out.println("Profit: " + subtotalProfit);
            } else if (trade.getAction().equals("BUY")) {
                lastTrade = trade;
            }
        }
        System.out.println("Total Profit: " + totalProfit);
    }
}