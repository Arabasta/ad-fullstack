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
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TradingApplication {
    private final LiveTrading liveTrading;
    private final BackTesting backTesting;
    private final MoneyPoolService moneyPoolService;
    private final CryptoWebSocketService cryptoWebSocketService;
    private final StockWebSocketService stockWebSocketService;

    @Autowired
    public TradingApplication(LiveTrading liveTrading, BackTesting backTesting, MoneyPoolService moneyPoolService, CryptoWebSocketService cryptoWebSocketService, StockWebSocketService stockWebSocketService) {
        this.liveTrading = liveTrading;
        this.backTesting = backTesting;
        this.moneyPoolService = moneyPoolService;
        this.cryptoWebSocketService = cryptoWebSocketService;
        this.stockWebSocketService = stockWebSocketService;
    }

    @Bean
    public CommandLineRunner commandLineRunner() {
        return args -> {

            runTradingAlgorithmBackTest("AAPL", PortfolioTypeEnum.AGGRESSIVE);
//            runTradingAlgorithmBackTest("X:BTCUSD");

            List<String> stockTickers = Arrays.asList("AAPL","GOOGL");
            List<String> cryptoTickers = Arrays.asList("BTC-USD","ETH-USD");
//            runTradingAlgorithmLive(stockTickers);
//            runTradingAlgorithmLive(cryptoTickers, PortfolioTypeEnum.AGGRESSIVE, cryptoWebSocketService);
        };
    }

    public void runTradingAlgorithmBackTest(String ticker, PortfolioTypeEnum portfolioType) {

        TradingAlgorithm tradingAlgorithm = new TradingAlgorithmOne(ticker, portfolioType, moneyPoolService);
        backTesting.run(tradingAlgorithm);

    }

//    public void runTradingAlgorithmLive(List<String> tickers, PortfolioTypeEnum portfolioType, MarketDataWebSocketService marketDataWebSocketService) {
//        LiveTrading liveTrading = new LiveTrading();
//        PortfolioTypeEnum portfolioType = PortfolioTypeEnum.AGGRESSIVE;
//        marketDataService.subscribeToLiveMarketData(tickers, marketDataWebSocketService);
//        for (String ticker : tickers) {
//            TradingAlgorithm tradingAlgorithm = new TradingAlgorithmOne(ticker, portfolioType, moneyPoolService);
//            liveTrading.run(tradingAlgorithm, pricePredictions, stockData, marketDataService.getLiveMarketDataFlux();
//
//        }
//    }


    @Scheduled(cron = "0 */10 * * * *") // Runs every 10 minutes
    public void runTradingAlgorithm() {
        try {

        } catch (Exception e) {

        }
    }
}
