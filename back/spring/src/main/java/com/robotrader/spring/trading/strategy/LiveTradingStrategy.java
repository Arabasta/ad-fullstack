package com.robotrader.spring.trading.strategy;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.robotrader.spring.model.enums.TickerTypeEnum;
import com.robotrader.spring.trading.algorithm.base.TradingAlgorithmBase;
import com.robotrader.spring.trading.dto.LiveMarketDataDTO;
import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.interfaces.TradePersistence;
import com.robotrader.spring.trading.interfaces.TradingStrategy;
import com.robotrader.spring.trading.service.HistoricalMarketDataService;
import com.robotrader.spring.trading.service.LiveMarketDataService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;

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
    private HistoricalMarketDataService historicalMarketDataService;
    private LiveMarketDataService liveMarketDataService;
    private TickerTypeEnum tickerType;
    private static final Logger logger = LoggerFactory.getLogger(LiveTradingStrategy.class);

    public LiveTradingStrategy(TradePersistence tradePersistence,
                               HistoricalMarketDataService historicalMarketDataService,
                               LiveMarketDataService liveMarketDataService,
                               TickerTypeEnum tickerType) {
        this.tradePersistence = tradePersistence;
        this.historicalMarketDataService = historicalMarketDataService;
        this.liveMarketDataService = liveMarketDataService;
        this.tickerType = tickerType;
        this.completionFuture = new CompletableFuture<>();
    }

    @Override
    public CompletableFuture<Void> execute(TradingAlgorithmBase tradingAlgorithmBase) {
        this.completionFuture = new CompletableFuture<>();

        return CompletableFuture.runAsync(() -> {
            Flux<LiveMarketDataDTO> dataFlux;
            if (tickerType == TickerTypeEnum.CRYPTO) {
                dataFlux = liveMarketDataService.getLiveCryptoDataFlux();
            } else if (tickerType == TickerTypeEnum.STOCKS) {
                dataFlux = liveMarketDataService.getLiveStocksDataFlux();
            } else {
                throw new IllegalArgumentException("Unsupported ticker type: " + tickerType);
            }

            dataSubscription = dataFlux.subscribe(
                    data -> {
                        this.latestMarketData = data;
                        if (processResponseTicker(latestMarketData.getTicker()).equals(tradingAlgorithmBase.getTicker()) ||
                                latestMarketData.getTicker().equals(tradingAlgorithmBase.getTicker())) {
                            tradingAlgorithmBase.setCurrentPrice(latestMarketData.getC());
                            setupAndExecuteLiveTrade(tradingAlgorithmBase);
                        }
                    },
                    error -> {
                        logger.error("Error in market data stream: " + error);
                        error.printStackTrace();
                    },
                    () -> logger.info("Market data stream completed")
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

    private void setupAndExecuteLiveTrade(TradingAlgorithmBase tradingAlgorithmBase) {
        historicalMarketDataService.getHistoricalMarketData(processTicker(tradingAlgorithmBase.getTicker()))
                .doOnNext(data-> tradingAlgorithmBase.setPriceHistory(data))
                .doOnNext(data -> tradingAlgorithmBase.setPricePredictions(getPricePredictions(data)))
                .doOnNext(data -> {
                    TradeTransaction lastTransactionBeforeExecution = tradingAlgorithmBase.getLastTradeTransaction();
                    boolean isTest = false;
                    tradingAlgorithmBase.execute(isTest);
                    TradeTransaction newTransaction = tradingAlgorithmBase.getLastTradeTransaction();

                    // Only process the trade if a new transaction was created
                    if (newTransaction != null && !newTransaction.equals(lastTransactionBeforeExecution)) {
                        processTrade(newTransaction);
                    }
                })
                .subscribe(
                        data -> logger.info("Historical data retrieved successfully."),
                        error -> {
                            logger.error("Error during historical data retrieval: {}", error.getMessage());
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
