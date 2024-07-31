package com.robotrader.spring.trading.strategy;

import com.robotrader.spring.trading.algorithm.base.TradingAlgorithmBase;
import com.robotrader.spring.trading.dto.LiveMarketData;
import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.interfaces.TradePersistence;
import com.robotrader.spring.trading.interfaces.TradingStrategy;
import com.robotrader.spring.trading.service.MarketDataService;
import reactor.core.Disposable;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

public class LiveTradingStrategy implements TradingStrategy {
    private LiveMarketData latestMarketData;
    private Disposable dataSubscription;
    private final TradePersistence tradePersistence;
    private final CompletableFuture<Void> completionFuture = new CompletableFuture<>();

    public LiveTradingStrategy(TradePersistence tradePersistence) {
        this.tradePersistence = tradePersistence;
    }

    @Override
    public CompletableFuture<Void> execute(TradingAlgorithmBase tradingAlgorithmBase, MarketDataService marketDataService) {
        return CompletableFuture.runAsync(() -> {
            dataSubscription = marketDataService.getLiveMarketDataFlux().subscribe(
                    data -> {
                        this.latestMarketData = data;
                        if (processResponseTicker(latestMarketData.getTicker()).equals(tradingAlgorithmBase.getTicker()) ||
                                latestMarketData.getTicker().equals(tradingAlgorithmBase.getTicker())) {
                            tradingAlgorithmBase.setCurrentPrice(latestMarketData.getC());
                            setupAndExecuteLiveTrade(tradingAlgorithmBase, marketDataService);
                        }
                    },
                    error -> {
                        System.err.println("Error in market data stream: " + error);
                        error.printStackTrace();
                    },
                    () -> System.out.println("Market data stream completed")
            );
            completionFuture.complete(null); // Complete when stream ends
        });
    }

    @Override
    public void processTrade(TradeTransaction trade) {
        tradePersistence.saveTrade(trade);
    }

    // Polygon's API and websocket ticker format is different. eg. X:BTCUSD vs X:BTC-USD
    @Override
    public String processTicker(String ticker) {
        return ticker.replace("-","");
    }

    // Polygon's websocket ticker subscription is X:BTC-USD but response object is BTC-USD......
    private String processResponseTicker(String ticker) { return "X:" + ticker; }

    private void setupAndExecuteLiveTrade(TradingAlgorithmBase tradingAlgorithmBase, MarketDataService marketDataService) {
        marketDataService.getHistoricalMarketData(processTicker(tradingAlgorithmBase.getTicker()))
                .doOnNext(data-> tradingAlgorithmBase.setPriceHistory(data))
                .doOnNext(data -> tradingAlgorithmBase.setPricePredictions(getPricePredictions(data)))
                .doOnNext(data -> {
                    TradeTransaction lastTransactionBeforeExecution = tradingAlgorithmBase.getLastTradeTransaction();
                    tradingAlgorithmBase.executeLiveTrade();
                    TradeTransaction newTransaction = tradingAlgorithmBase.getLastTradeTransaction();

                    // Only process the trade if a new transaction was created
                    if (newTransaction != null && !newTransaction.equals(lastTransactionBeforeExecution)) {
                        processTrade(newTransaction);
                    }
                })
                .subscribe(
                        data -> System.out.println("Historical data retrieved successfully."),
                        error -> {
                            System.err.println("Error during historical data retrieval: " + error.getMessage());
                            error.printStackTrace();
                        }
                );
    }

    public List<BigDecimal> getPricePredictions(Map<String, List<Object>> marketDataHistory) {
        List<Object> objects = marketDataHistory.get("close");
        return objects.stream()
                .map(price -> (BigDecimal) price)
                .collect(Collectors.toList()); //TODO: Predictions == history for now
    }

    public void stop() {
        unsubscribeFromMarketData();
        completionFuture.complete(null); // Complete on stop
    }

    // todo: is it possible to unsub for 1 ticker only? or need to resub
    public void unsubscribeFromMarketData() {
        if (dataSubscription != null && !dataSubscription.isDisposed()) {
            dataSubscription.dispose();
        }
    }

    public List<TradeTransaction> getTradeResults () {
        List<TradeTransaction> trades = tradePersistence.readAllTrades();
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
        return trades;
    }
}
