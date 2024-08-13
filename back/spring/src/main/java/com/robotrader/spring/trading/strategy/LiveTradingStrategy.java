package com.robotrader.spring.trading.strategy;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.robotrader.spring.dto.ticker.TickerDTO;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.enums.TickerTypeEnum;
import com.robotrader.spring.trading.algorithm.base.TradingAlgorithmBase;
import com.robotrader.spring.trading.dto.LiveMarketDataDTO;
import com.robotrader.spring.trading.dto.PredictionDTO;
import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.interfaces.TradePersistence;
import com.robotrader.spring.trading.interfaces.TradingStrategy;
import com.robotrader.spring.trading.service.HistoricalMarketDataService;
import com.robotrader.spring.trading.service.LiveMarketDataService;
import com.robotrader.spring.trading.service.PredictionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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
    private PredictionService predictionService;
    private TickerTypeEnum tickerType;
    private TradingAlgorithmBase tradingAlgorithm;
    private static final int MIN_INPUT_SIZE = 76;
    private static final int LIMIT = 1000; // API call data limit
    private static final Logger logger = LoggerFactory.getLogger(LiveTradingStrategy.class);

    public LiveTradingStrategy(TradePersistence tradePersistence,
                               HistoricalMarketDataService historicalMarketDataService,
                               LiveMarketDataService liveMarketDataService,
                               PredictionService predictionService,
                               TickerTypeEnum tickerType) {
        this.tradePersistence = tradePersistence;
        this.historicalMarketDataService = historicalMarketDataService;
        this.liveMarketDataService = liveMarketDataService;
        this.predictionService = predictionService;
        this.tickerType = tickerType;
        this.completionFuture = new CompletableFuture<>();
    }

    @Override
    public CompletableFuture<Void> execute(TradingAlgorithmBase tradingAlgorithm) {
        this.tradingAlgorithm = tradingAlgorithm;
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
                        if (processResponseTicker(latestMarketData.getTicker()).equals(tradingAlgorithm.getTicker()) ||
                                latestMarketData.getTicker().equals(tradingAlgorithm.getTicker())) {
                            tradingAlgorithm.setCurrentPrice(latestMarketData.getC());
                            setupAndExecuteLiveTrade(tradingAlgorithm);
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
    private String processResponseTicker(String ticker) { return "X:" + processTicker(ticker); }

    private void setupAndExecuteLiveTrade(TradingAlgorithmBase tradingAlgorithm) {
        historicalMarketDataService.getHistoricalMarketData(processTicker(tradingAlgorithm.getTicker()), LIMIT)
                .flatMap(data -> {
                    tradingAlgorithm.setPriceHistory(data);
                    return getPricePredictions(data, tradingAlgorithm.getTicker());
                })
                .doOnNext(predictionDTO -> {
                    tradingAlgorithm.setPricePredictions(predictionDTO.getPredictions());
                })
                .doOnNext(data -> {
                    TradeTransaction lastTransactionBeforeExecution = tradingAlgorithm.getCurrentTradeTransaction();
                    boolean isTest = false;
                    tradingAlgorithm.execute(isTest);
                    TradeTransaction newTransaction = tradingAlgorithm.getCurrentTradeTransaction();

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

    public Mono<PredictionDTO> getPricePredictions(Map<String, List<Object>> marketDataHistory, String tickerName
    ) {
        List<BigDecimal> historicalPrices = marketDataHistory.get("vw").stream()
                .map(price -> (BigDecimal) price)
                .collect(Collectors.toList());

        PredictionDTO predictionDTO = new PredictionDTO();
        predictionDTO.setPredictions(historicalPrices);

        TickerDTO tickerDTO = new TickerDTO();
        tickerDTO.setTickerName(tickerName);
        tickerDTO.setTickerType(TickerTypeEnum.STOCKS);
        tickerDTO.setPortfolioType(PortfolioTypeEnum.AGGRESSIVE);
        predictionDTO.setTickerDTO(tickerDTO);

        return Mono.just(predictionDTO);
// todo: replace above with below code for deployment. Above code doesn't require fast api prediction server to be set up
//        PredictionDTO predictionDTO = new PredictionDTO();
//        int dataSize = marketDataHistory.get("vw").size();
//        List<BigDecimal> historicalVW = marketDataHistory.get("vw").subList(dataSize - MIN_INPUT_SIZE, dataSize)
//                .stream()
//                .map(obj -> new BigDecimal(obj.toString()))
//                .collect(Collectors.toList());
//        predictionDTO.setPredictions(historicalVW);
//        TickerDTO tickerDTO = new TickerDTO();
//        tickerDTO.setTickerName(processTicker(tickerName));
//        tickerDTO.setTickerType(TickerTypeEnum.STOCKS);
//        tickerDTO.setPortfolioType(PortfolioTypeEnum.AGGRESSIVE);
//        predictionDTO.setTickerDTO(tickerDTO);
//        logger.debug("Price prediction input: {}", historicalVW);
//        Mono<PredictionDTO> predictionDTOMono;
//        try {
//            predictionDTOMono = predictionService.byPredictionDtoBacktest(predictionDTO);
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//        return predictionDTOMono;
    }

    @Override
    public void stop() {
        if (tradingAlgorithm.stopLiveTrade()) {
            TradeTransaction transaction = tradingAlgorithm.getCurrentTradeTransaction();
            if (transaction != null) {
                processTrade(transaction);
            }
        }
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
