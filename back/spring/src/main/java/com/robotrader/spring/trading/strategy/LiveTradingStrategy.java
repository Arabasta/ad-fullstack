package com.robotrader.spring.trading.strategy;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.robotrader.spring.trading.algorithm.base.TradingAlgorithmBase;
import com.robotrader.spring.trading.dto.LiveMarketDataDTO;
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
    private LiveMarketDataDTO latestMarketData;
    private Disposable dataSubscription;
    private final TradePersistence tradePersistence;
    private CompletableFuture<Void> completionFuture;
    private MarketDataService marketDataService;

    public LiveTradingStrategy(TradePersistence tradePersistence) {
        this.tradePersistence = tradePersistence;
        this.completionFuture = new CompletableFuture<>();
    }

    @Override
    public CompletableFuture<Void> execute(TradingAlgorithmBase tradingAlgorithmBase, MarketDataService marketDataService) {
        System.out.println("Executing live trading strategy");
        this.marketDataService = marketDataService;
        this.completionFuture = new CompletableFuture<>();

        int timeoutSeconds = 10; // Timeout duration for connecting to live data
        long startTime = System.currentTimeMillis();
        System.out.println(marketDataService.isConnectedAndAuthenticated());
        return CompletableFuture.runAsync(() -> {
            System.out.println("Subscribing to live market data flux");

            while (!marketDataService.isConnectedAndAuthenticated()) {
            try {
                if ((System.currentTimeMillis() - startTime) / 1000 > timeoutSeconds) {
                    throw new RuntimeException("WebSocket connection timed out");
                }
                System.out.println("Waiting for WebSocket connection...");
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
                }
            System.out.println(marketDataService.isConnectedAndAuthenticated());
            if (marketDataService.isConnectedAndAuthenticated()) {
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
            }
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

    @Override
    public void stop() {
        unsubscribeFromFlux();
        completionFuture.complete(null); // Complete on stop
        marketDataService.disconnectLiveMarketData();
    }

    public void unsubscribeFromFlux() {
        if (dataSubscription != null && !dataSubscription.isDisposed()) {
            dataSubscription.dispose();
        }
    }

    public List<ObjectNode> getTradeResults() {
        return tradePersistence.getAllTrades();
    }
}
