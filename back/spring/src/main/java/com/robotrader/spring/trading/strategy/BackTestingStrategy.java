package com.robotrader.spring.trading.strategy;

import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.algorithm.base.TradingAlgorithmBase;
import com.robotrader.spring.trading.interfaces.TradePersistence;
import com.robotrader.spring.trading.interfaces.TradingStrategy;
import com.robotrader.spring.trading.service.MarketDataService;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class BackTestingStrategy implements TradingStrategy {
    private final TradePersistence tradePersistence;

    public BackTestingStrategy(TradePersistence tradePersistence) {
        this.tradePersistence = tradePersistence;
    }

    @Override
    public void execute(TradingAlgorithmBase tradingAlgorithmBase, MarketDataService marketDataService) {
        marketDataService.getHistoricalMarketData(processTicker(tradingAlgorithmBase.getTicker()))
                .doOnNext(data -> runSimulation(tradingAlgorithmBase, data))
                .doOnNext(data -> printTrade(tradePersistence.readAllTrades()))
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
        tradePersistence.saveTrade(trade);
    }

    // Polygon's API and websocket ticker format is different. eg. BTCUSD vs BTC-USD
    @Override
    public String processTicker(String ticker) {
        return ticker.replace("-","");
    }

    public void runSimulation(TradingAlgorithmBase tradingAlgorithmBase, Map<String, List<Object>> marketDataHistory) {

        List<BigDecimal> pricePredictions = getPricePredictions(marketDataHistory);
        // Loop through price history and execute algo, simulating progress of time
        while (!pricePredictions.isEmpty()) {
            TradeTransaction lastTransactionBeforeExecution = tradingAlgorithmBase.getLastTradeTransaction();

            tradingAlgorithmBase.setPricePredictions(new ArrayList<>(pricePredictions));
            tradingAlgorithmBase.setPriceHistory(new HashMap<>(marketDataHistory));
            tradingAlgorithmBase.executeBackTest();
            pricePredictions.remove(0); // Remove the oldest price
            marketDataHistory.get("timestamp").remove(0);
            marketDataHistory.get("open").remove(0);
            marketDataHistory.get("close").remove(0);
            marketDataHistory.get("high").remove(0);
            marketDataHistory.get("low").remove(0);

            TradeTransaction newTransaction = tradingAlgorithmBase.getLastTradeTransaction();
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

    //todo: delete printTrade if not required
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