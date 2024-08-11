package com.robotrader.spring.trading.service;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.robotrader.spring.aws.s3.S3TransactionLogger;
import com.robotrader.spring.model.Ticker;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.enums.TickerTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;
import com.robotrader.spring.service.TickerService;
import com.robotrader.spring.service.log.TradeTransactionLogService;
import com.robotrader.spring.trading.persistence.DatabaseStoreTradePersistence;
import com.robotrader.spring.trading.persistence.MemoryStoreTradePersistence;
import com.robotrader.spring.trading.interfaces.ITradingApplicationService;
import com.robotrader.spring.trading.dto.BackTestResultDTO;
import com.robotrader.spring.trading.strategy.BackTestingStrategy;
import com.robotrader.spring.trading.strategy.LiveTradingStrategy;
import com.robotrader.spring.trading.algorithm.base.TradingAlgorithmBase;
import com.robotrader.spring.trading.strategy.TradingContext;
import lombok.Getter;
import org.reflections.Reflections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class TradingApplicationService implements ITradingApplicationService {
    private final MoneyPoolService moneyPoolService;
    private final HistoricalMarketDataService historicalMarketDataService;
    private final LiveMarketDataService liveMarketDataService;
    private final TradeTransactionLogService tradeTransactionLogService;
    private final S3TransactionLogger s3TransactionLogger;
    private final PredictionService predictionService;
    private final TickerService tickerService;
    @Getter
    private List<TradingContext> tradingContexts;
    private static Map<String, Class<? extends TradingAlgorithmBase>> algorithmMap = new HashMap<>();
    private static final Logger logger = LoggerFactory.getLogger(TradingApplicationService.class);

    @Autowired
    public TradingApplicationService(MoneyPoolService moneyPoolService,
                                     HistoricalMarketDataService historicalMarketDataService,
                                     LiveMarketDataService liveMarketDataService, TradeTransactionLogService tradeTransactionLogService,
                                     Optional<S3TransactionLogger> s3TransactionLogger, PredictionService predictionService, TickerService tickerService) {
        this.moneyPoolService = moneyPoolService;
        this.historicalMarketDataService = historicalMarketDataService;
        this.liveMarketDataService = liveMarketDataService;
        this.tradeTransactionLogService = tradeTransactionLogService;
        this.s3TransactionLogger = s3TransactionLogger.orElse(null);
        this.predictionService = predictionService;
        this.tickerService = tickerService;
        this.tradingContexts = new ArrayList<>();

        initializeAlgorithmMap();
    }

    @Override
    public BackTestResultDTO runTradingAlgorithmBackTest(List<String> tickers, PortfolioTypeEnum portfolioType, String algorithmType) {
        AtomicReference<BigDecimal> initialCapital = new AtomicReference<>(BigDecimal.ZERO);
        List<ObjectNode> combinedTradeResults = Collections.synchronizedList(new ArrayList<>());

        List<CompletableFuture<Void>> futures = new ArrayList<>();

        for (String ticker : tickers) {
            TradingContext tradingContext = new TradingContext();
            tradingContext.setStrategy(new BackTestingStrategy(
                    new MemoryStoreTradePersistence(), historicalMarketDataService, predictionService));

            // reference: https://www.baeldung.com/java-reflection
            // Get the algorithm class from the map created in initializeAlgorithmMap based on the input param to this method
            Class<? extends TradingAlgorithmBase> algorithmClass = algorithmMap.get(algorithmType);
            if (algorithmClass != null) {
                try {
                    // Create a reflection constructor to take in the 3 constructor param types
                    Constructor<? extends TradingAlgorithmBase> constructor = algorithmClass.getConstructor(String.class, PortfolioTypeEnum.class, MoneyPoolService.class);
                    // Use the reflection constructor to instantiate the selected algo class
                    TradingAlgorithmBase tradingAlgorithm = constructor.newInstance(ticker, portfolioType, moneyPoolService);
                    // Execute the trading strategy asynchronously. Completable futures used to ensure all back testing is completed before processing results
                    CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                        tradingContext.executeTradingStrategy(tradingAlgorithm).join();
                        // Update combinedInitialCapital using AtomicReference and add trade results using synchronized list as back testing is done async on multiple threads
                        initialCapital.set(tradingAlgorithm.getInitialCapitalTest());
                        combinedTradeResults.addAll(tradingContext.getTradeResults());
                    });
                    futures.add(future);
                } catch (NoSuchMethodException | InstantiationException | IllegalAccessException |
                         InvocationTargetException e) {
                    logger.error("Error instantiating trading algorithm: {}", e.getMessage());
                }
            } else {
                logger.error("No algorithm found for type: {}", algorithmType);
            }


        }

        // Wait for all futures to complete
        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        combinedTradeResults.sort(Comparator
                .comparing((ObjectNode result) -> result.get("ticker").asText())
                .thenComparing(result -> LocalDateTime.parse(result.get("transactionDateTime").asText(), dtf))
        );

        // Create the combined BackTestResultDTO after all futures are complete
        BackTestResultDTO combinedResult = new BackTestResultDTO(initialCapital.get(), combinedTradeResults);
        logger.info("Total number of trades for all tickers: {}", combinedTradeResults.size());
        return combinedResult;
    }

    @Override
    public void runTradingAlgorithmLive(String algorithmType) {
        if (!LiveMarketDataService.isRunning()) {
            liveMarketDataService.subscribeToLiveMarketData();
        }
        for (TickerTypeEnum tickerType : TickerTypeEnum.values()) {
            for (PortfolioTypeEnum portfolioType : PortfolioTypeEnum.values()) {
                List<Ticker> tickerList = null;
                switch (tickerType) {
                    case STOCKS -> tickerList = tickerService.getAllStockTickerName();
                    case CRYPTO -> tickerList = tickerService.getAllCrytpoTickerName();
                }
                List<String> tickers = tickerList.stream()
                        .filter(ticker -> ticker.getPortfolioType() == portfolioType)
                        .map(Ticker::getTickerName)
                        .toList();

                if (tickers != null && !tickers.isEmpty()) {
                    for (String ticker : tickers) {
                        TradingContext tradingContext = new TradingContext();
                        tradingContexts.add(tradingContext);
                        tradingContext.setStrategy(new LiveTradingStrategy(
                                new DatabaseStoreTradePersistence(tradeTransactionLogService),
                                historicalMarketDataService, liveMarketDataService, predictionService, tickerType));

                        // reference: https://www.baeldung.com/java-reflection
                        // Get the algorithm class from the map created in initializeAlgorithmMap based on the input param to this method
                        Class<? extends TradingAlgorithmBase> algorithmClass = algorithmMap.get(algorithmType);
                        if (algorithmClass != null) {
                            try {
                                // Create a reflection constructor to take in the 3 constructor param types
                                Constructor<? extends TradingAlgorithmBase> constructor = algorithmClass.getConstructor(String.class, PortfolioTypeEnum.class, MoneyPoolService.class);
                                // Use the reflection constructor to instantiate the selected algo class
                                TradingAlgorithmBase tradingAlgorithm = constructor.newInstance(ticker, portfolioType, moneyPoolService);
                                tradingContext.executeTradingStrategy(tradingAlgorithm);
                            } catch (NoSuchMethodException | InstantiationException | IllegalAccessException |
                                     InvocationTargetException e) {
                                logger.error("Error instantiating trading algorithm: {}", e.getMessage());
                            }
                        } else {
                            logger.error("No algorithm found for type: {}", algorithmType);
                        }
                    }
                }
            }
        }
    }

    @Override
    public void stopTradingAlgorithmLive() {
        liveMarketDataService.disconnectLiveMarketData();
        try {
            // Pause for 1 second, for data flux completion
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            logger.error("Thread was interrupted during sleep", e);
        }
        for (TradingContext tradingContext : tradingContexts) {
            tradingContext.stop();
        }
        tradingContexts.clear();

    }

    @Override
    public Set<String> getAlgorithms(){
        return algorithmMap.keySet();
    }

    // reference: https://www.baeldung.com/java-reflection
    private void initializeAlgorithmMap() {
        // Algorithms are stored in this package
        Reflections reflections = new Reflections("com.robotrader.spring.trading.algorithm");
        Set<Class<? extends TradingAlgorithmBase>> classes = reflections.getSubTypesOf(TradingAlgorithmBase.class);

        for (Class<? extends TradingAlgorithmBase> clazz : classes) {
            try {
                Field field = clazz.getField("ALGORITHM_TYPE");
                String algorithmType = (String) field.get(null);
                algorithmMap.put(algorithmType, clazz);
                logger.debug("{}: {}", clazz.getName(), algorithmType);
            } catch (NoSuchFieldException | IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }
}
