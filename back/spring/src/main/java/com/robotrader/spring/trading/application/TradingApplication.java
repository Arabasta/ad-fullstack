package com.robotrader.spring.trading.application;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;
import com.robotrader.spring.trading.MemoryStoreTradePersistence;
import com.robotrader.spring.trading.strategy.BackTestingStrategy;
import com.robotrader.spring.trading.strategy.LiveTradingStrategy;
import com.robotrader.spring.trading.service.CryptoWebSocketService;
import com.robotrader.spring.trading.service.MarketDataService;
import com.robotrader.spring.trading.algorithm.TradingAlgorithm;
import com.robotrader.spring.trading.algorithm.TradingAlgorithmOne;
import com.robotrader.spring.trading.service.MarketDataWebSocketService;
import com.robotrader.spring.trading.service.StockWebSocketService;
import com.robotrader.spring.trading.strategy.TradingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class TradingApplication {
    private final MoneyPoolService moneyPoolService;
    private final MarketDataService marketDataService;
    private final CryptoWebSocketService cryptoWebSocketService;
    private final StockWebSocketService stockWebSocketService;
    private final TradingContext tradingContext;

    @Autowired
    public TradingApplication(MoneyPoolService moneyPoolService, MarketDataService marketDataService, CryptoWebSocketService cryptoWebSocketService, StockWebSocketService stockWebSocketService) {
        this.moneyPoolService = moneyPoolService;
        this.marketDataService = marketDataService;
        this.cryptoWebSocketService = cryptoWebSocketService;
        this.stockWebSocketService = stockWebSocketService;
        this.tradingContext = new TradingContext(marketDataService);
    }

    @Bean
    public CommandLineRunner commandLineRunner() {
        return args -> {

//            runTradingAlgorithmBackTest("AAPL", PortfolioTypeEnum.AGGRESSIVE);
//            runTradingAlgorithmBackTest("X:BTC-USD", PortfolioTypeEnum.AGGRESSIVE);

//            List<String> stockTickers = Arrays.asList("AAPL","GOOGL");
            List<String> stockTickers = Arrays.asList("AAPL");
//            List<String> cryptoTickers = Arrays.asList("X:BTC-USD","X:ETH-USD");
            List<String> cryptoTickers = Arrays.asList("X:BTC-USD");
//            runTradingAlgorithmLive(stockTickers, PortfolioTypeEnum.AGGRESSIVE, stockWebSocketService);
//            runTradingAlgorithmLive(cryptoTickers, PortfolioTypeEnum.AGGRESSIVE, cryptoWebSocketService);
        };

    }

    public void runTradingAlgorithmBackTest(String ticker, PortfolioTypeEnum portfolioType) {
        tradingContext.setStrategy(new BackTestingStrategy(new MemoryStoreTradePersistence()));
        TradingAlgorithm tradingAlgorithm = new TradingAlgorithmOne(ticker, portfolioType, moneyPoolService);
        tradingContext.executeTradingStrategy(tradingAlgorithm);
    }

    public void runTradingAlgorithmLive(List<String> tickers, PortfolioTypeEnum portfolioType, MarketDataWebSocketService marketDataWebSocketService) {
        marketDataService.subscribeToLiveMarketData(tickers, marketDataWebSocketService);
        tradingContext.setStrategy(new LiveTradingStrategy());
        for (String ticker : tickers) {
            TradingAlgorithm tradingAlgorithm = new TradingAlgorithmOne(ticker, portfolioType, moneyPoolService);
            tradingContext.executeTradingStrategy(tradingAlgorithm);
        }
    }


    @Scheduled(cron = "0 */10 * * * *") // Runs every 10 minutes
    public void runTradingAlgorithm() {
        try {

        } catch (Exception e) {

        }
    }
}
