package com.robotrader.spring.trading.service;

import com.robotrader.spring.aws.s3.S3TransactionLogger;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.enums.TickerTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;
import com.robotrader.spring.trading.MemoryStoreTradePersistence;
import com.robotrader.spring.trading.ObjectStoreTradePersistence;
import com.robotrader.spring.trading.interfaces.ITradingApplicationService;
import com.robotrader.spring.trading.dto.BackTestResultDTO;
import com.robotrader.spring.trading.strategy.BackTestingStrategy;
import com.robotrader.spring.trading.strategy.LiveTradingStrategy;
import com.robotrader.spring.trading.algorithm.base.TradingAlgorithmBase;
import com.robotrader.spring.trading.algorithm.TradingAlgorithmOne;
import com.robotrader.spring.trading.strategy.TradingContext;
import org.reflections.Reflections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
public class TradingApplicationService implements ITradingApplicationService {
    private final MoneyPoolService moneyPoolService;
    private final MarketDataService marketDataService;
    private final S3TransactionLogger s3TransactionLogger;
    private List<TradingContext> tradingContexts;
    private static final Logger logger = LoggerFactory.getLogger(TradingApplicationService.class);

    @Autowired
    public TradingApplicationService(MoneyPoolService moneyPoolService, MarketDataService marketDataService, Optional<S3TransactionLogger> s3TransactionLogger) {
        this.moneyPoolService = moneyPoolService;
        this.marketDataService = marketDataService;
        this.s3TransactionLogger = s3TransactionLogger.orElse(null);
        this.tradingContexts = new ArrayList<>();
    }

    @Override
    public BackTestResultDTO runTradingAlgorithmBackTest(String ticker, PortfolioTypeEnum portfolioType) {
        TradingContext tradingContext = new TradingContext(marketDataService);
        tradingContext.setStrategy(new BackTestingStrategy(new MemoryStoreTradePersistence()));
        TradingAlgorithmBase tradingAlgorithmOne = new TradingAlgorithmOne(ticker, portfolioType, moneyPoolService);
        CompletableFuture<Void> future = tradingContext.executeTradingStrategy(tradingAlgorithmOne);

        future.join(); // Waits for future to complete

        BackTestResultDTO result = new BackTestResultDTO(tradingAlgorithmOne.getInitialCapitalTest(), tradingContext.getTradeResults());
        return result;
    }

    @Override
    public void runTradingAlgorithmLive(List<String> tickers, PortfolioTypeEnum portfolioType, TickerTypeEnum tickerType) {

        TradingContext tradingContext = new TradingContext(marketDataService);
        tradingContexts.add(tradingContext);
        marketDataService.subscribeToLiveMarketData(tickers, tickerType);
        tradingContext.setStrategy(new LiveTradingStrategy(new ObjectStoreTradePersistence(Optional.ofNullable(s3TransactionLogger))));
        for (String ticker : tickers) {
            TradingAlgorithmBase tradingAlgorithmOne = new TradingAlgorithmOne(ticker, portfolioType, moneyPoolService);
            tradingContext.executeTradingStrategy(tradingAlgorithmOne);
        }
    }

    @Override
    public void stopTradingAlgorithmLive() {
        for (TradingContext tradingContext : tradingContexts) {
            tradingContext.stop();
        }
        tradingContexts.clear();
        marketDataService.disconnectLiveMarketData();
    }


    @Override
    @Scheduled(cron = "0 */10 * * * *") // todo: Runs every 10 minutes
    public void runTradingAlgorithm() {
        try {

        } catch (Exception e) {

        }
    }

    @Override
    public List<String> getAlgorithmList() {
        Reflections reflections = new Reflections("com.robotrader.spring.trading.algorithm");
        Set<Class<? extends TradingAlgorithmBase>> classes = reflections.getSubTypesOf(TradingAlgorithmBase.class);

        List<String> algorithmTypes = new ArrayList<>();
        for (Class<? extends TradingAlgorithmBase> clazz : classes) {
            try {
                Field field = clazz.getField("ALGORITHM_TYPE");
                String algorithmType = (String) field.get(null);
                algorithmTypes.add(algorithmType);
                logger.info("{}: {}", clazz.getName(), algorithmType);
            } catch (NoSuchFieldException | IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return algorithmTypes;
    }
}
