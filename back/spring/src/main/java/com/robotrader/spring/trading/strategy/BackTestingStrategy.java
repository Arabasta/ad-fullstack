package com.robotrader.spring.trading.strategy;

import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.algorithm.TradingAlgorithm;
import com.robotrader.spring.trading.interfaces.TradingStrategy;
import com.robotrader.spring.trading.service.MarketDataService;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class BackTestingStrategy implements TradingStrategy {
    private List<TradeTransaction> tradeTransactions = new ArrayList<>();

    @Override
    public void execute(TradingAlgorithm tradingAlgorithm, MarketDataService marketDataService) {
        marketDataService.getHistoricalMarketData(processTicker(tradingAlgorithm.getTicker()))
                .doOnNext(data -> runSimulation(tradingAlgorithm, data))
                .doOnNext(data -> printTrade(tradeTransactions))
                .subscribe(
                        data -> System.out.println("Backtesting completed successfully."),
                        error -> {
                            System.err.println("Error during backtesting: " + error.getMessage());
                            error.printStackTrace();
                        }
                );

    }

    @Override
    public void processTrade(TradeTransaction trade) {
        tradeTransactions.add(trade);
    }

    // Polygon's API and websocket ticker format is different. eg. BTCUSD vs BTC-USD
    @Override
    public String processTicker(String ticker) {
        return ticker.replace("-","");
    }

    public void runSimulation(TradingAlgorithm tradingAlgorithm, Map<String, List<Object>> marketDataHistory) {

        List<BigDecimal> pricePredictions = getPricePredictions(marketDataHistory);
        // Loop through price history and execute algo, simulating progress of time
        while (!pricePredictions.isEmpty()) {
            TradeTransaction lastTransactionBeforeExecution = tradingAlgorithm.getLastTradeTransaction();

            tradingAlgorithm.setPricePredictions(new ArrayList<>(pricePredictions));
            tradingAlgorithm.setPriceHistory(new HashMap<>(marketDataHistory));
            tradingAlgorithm.executeBackTest();
            pricePredictions.remove(0); // Remove the oldest price
            marketDataHistory.get("timestamp").remove(0);
            marketDataHistory.get("open").remove(0);
            marketDataHistory.get("close").remove(0);
            marketDataHistory.get("high").remove(0);
            marketDataHistory.get("low").remove(0);

            TradeTransaction newTransaction = tradingAlgorithm.getLastTradeTransaction();
            // Only process the trade if a new transaction was created
            if (newTransaction != null && !newTransaction.equals(lastTransactionBeforeExecution)) {
                processTrade(newTransaction);
            }

        }
    }

    public List<BigDecimal> getPricePredictions(Map<String, List<Object>> marketDataHistory) {
        List<Object> objects = marketDataHistory.get("close");
        return objects.stream()
                .map(price -> (BigDecimal) price)
                .collect(Collectors.toList()); //TODO: Predictions == history for now
    }

    public void printTrade(List<TradeTransaction> trades) {
        TradeTransaction lastTrade = null;
        BigDecimal totalProfit = BigDecimal.ZERO;
        System.out.println("Trade Transactions: ");
        if (trades != null && !trades.isEmpty()) {
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
}