package com.robotrader.spring.trading.application;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;
import com.robotrader.spring.trading.MemoryStoreTradePersistence;
import com.robotrader.spring.trading.dto.BackTestResultDTO;
import com.robotrader.spring.trading.strategy.BackTestingStrategy;
import com.robotrader.spring.trading.strategy.LiveTradingStrategy;
import com.robotrader.spring.trading.service.CryptoWebSocketService;
import com.robotrader.spring.trading.service.MarketDataService;
import com.robotrader.spring.trading.algorithm.base.TradingAlgorithmBase;
import com.robotrader.spring.trading.algorithm.TradingAlgorithmOne;
import com.robotrader.spring.trading.service.MarketDataWebSocketService;
import com.robotrader.spring.trading.service.StockWebSocketService;
import com.robotrader.spring.trading.strategy.TradingContext;
import org.reflections.Reflections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

@Service
public class TradingApplicationService implements ITradingApplicationService {
    private final MoneyPoolService moneyPoolService;
    private final MarketDataService marketDataService;
    private final CryptoWebSocketService cryptoWebSocketService;
    private final StockWebSocketService stockWebSocketService;

    @Autowired
    public TradingApplicationService(MoneyPoolService moneyPoolService, MarketDataService marketDataService, CryptoWebSocketService cryptoWebSocketService, StockWebSocketService stockWebSocketService) {
        this.moneyPoolService = moneyPoolService;
        this.marketDataService = marketDataService;
        this.cryptoWebSocketService = cryptoWebSocketService;
        this.stockWebSocketService = stockWebSocketService;
    }

//    @Bean
//    public CommandLineRunner commandLineRunner() {
//        return args -> {

//            runTradingAlgorithmBackTest("AAPL", PortfolioTypeEnum.AGGRESSIVE);
//            runTradingAlgorithmBackTest("X:BTC-USD", PortfolioTypeEnum.AGGRESSIVE);

//            List<String> stockTickers = Arrays.asList("AAPL","GOOGL");
//            List<String> stockTickers = Arrays.asList("AAPL");
//            List<String> cryptoTickers = Arrays.asList("X:BTC-USD","X:ETH-USD");
//            List<String> cryptoTickers = Arrays.asList("X:BTC-USD");
//            runTradingAlgorithmLive(stockTickers, PortfolioTypeEnum.AGGRESSIVE, stockWebSocketService);
//            runTradingAlgorithmLive(cryptoTickers, PortfolioTypeEnum.AGGRESSIVE, cryptoWebSocketService);
//        };
//
//    }

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
    public void runTradingAlgorithmLive(List<String> tickers, PortfolioTypeEnum portfolioType, MarketDataWebSocketService marketDataWebSocketService) {
        TradingContext tradingContext = new TradingContext(marketDataService);
        marketDataService.subscribeToLiveMarketData(tickers, marketDataWebSocketService);
        tradingContext.setStrategy(new LiveTradingStrategy(new MemoryStoreTradePersistence())); //todo: change to object store
        for (String ticker : tickers) {
            TradingAlgorithmBase tradingAlgorithmOne = new TradingAlgorithmOne(ticker, portfolioType, moneyPoolService);
            tradingContext.executeTradingStrategy(tradingAlgorithmOne);
        }
    }


    @Override
    @Scheduled(cron = "0 */10 * * * *") // Runs every 10 minutes
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
                System.out.println(clazz.getName() + ": " + algorithmType);
            } catch (NoSuchFieldException | IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return algorithmTypes;
    }
}
