package com.robotrader.spring.trading.application;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;
import com.robotrader.spring.trading.BackTesting;
import com.robotrader.spring.trading.LiveTrading;
import com.robotrader.spring.trading.service.CryptoWebSocketService;
import com.robotrader.spring.trading.service.MarketDataService;
import com.robotrader.spring.trading.algorithm.TradingAlgorithm;
import com.robotrader.spring.trading.algorithm.TradingAlgorithmOne;
import com.robotrader.spring.trading.service.MarketDataWebSocketService;
import com.robotrader.spring.trading.service.StockWebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TradingApplication {
    private final MoneyPoolService moneyPoolService;
    private final MarketDataService marketDataService;
    private final CryptoWebSocketService cryptoWebSocketService;
    private final StockWebSocketService stockWebSocketService;

    @Autowired
    public TradingApplication(MoneyPoolService moneyPoolService, MarketDataService marketDataService, CryptoWebSocketService cryptoWebSocketService, StockWebSocketService stockWebSocketService) {
        this.moneyPoolService = moneyPoolService;
        this.marketDataService = marketDataService;
        this.cryptoWebSocketService = cryptoWebSocketService;
        this.stockWebSocketService = stockWebSocketService;
    }

    @Bean
    public CommandLineRunner commandLineRunner() {
        return args -> {

//            runTradingAlgorithmBackTest("AAPL", PortfolioTypeEnum.AGGRESSIVE);
//            runTradingAlgorithmBackTest("X:BTC-USD", PortfolioTypeEnum.AGGRESSIVE);

            List<String> stockTickers = Arrays.asList("AAPL","GOOGL");
//            List<String> cryptoTickers = Arrays.asList("X:BTC-USD","X:ETH-USD");
            List<String> cryptoTickers = Arrays.asList("X:BTC-USD");
//            runTradingAlgorithmLive(stockTickers);
            runTradingAlgorithmLive(cryptoTickers, PortfolioTypeEnum.AGGRESSIVE, cryptoWebSocketService);
        };

    }

    public void runTradingAlgorithmBackTest(String ticker, PortfolioTypeEnum portfolioType) {
        TradingAlgorithm tradingAlgorithm = new TradingAlgorithmOne(ticker, portfolioType, moneyPoolService);
        BackTesting backTesting = new BackTesting(marketDataService);
        backTesting.run(tradingAlgorithm);
    }

    public void runTradingAlgorithmLive(List<String> tickers, PortfolioTypeEnum portfolioType, MarketDataWebSocketService marketDataWebSocketService) {
        marketDataService.subscribeToLiveMarketData(tickers, marketDataWebSocketService);
        for (String ticker : tickers) {
            TradingAlgorithm tradingAlgorithm = new TradingAlgorithmOne(ticker, portfolioType, moneyPoolService);
            LiveTrading liveTrading = new LiveTrading(marketDataService);
            liveTrading.run(tradingAlgorithm);
        }
    }


    @Scheduled(cron = "0 */10 * * * *") // Runs every 10 minutes
    public void runTradingAlgorithm() {
        try {

        } catch (Exception e) {

        }
    }
}
