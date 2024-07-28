package com.robotrader.spring.trading.application;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;
import com.robotrader.spring.trading.BackTesting;
import com.robotrader.spring.trading.service.MarketDataService;
import com.robotrader.spring.trading.algorithm.TradingAlgorithm;
import com.robotrader.spring.trading.algorithm.TradingAlgorithmOne;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TradingApplication {
    private final MarketDataService marketDataService;
    private final MoneyPoolService moneyPoolService;

    @Autowired
    public TradingApplication(MarketDataService marketDataService, MoneyPoolService moneyPoolService) {
        this.marketDataService = marketDataService;
        this.moneyPoolService = moneyPoolService;

    }

    @Bean
    public CommandLineRunner commandLineRunner() {
        return args -> {

            runTradingAlgorithmUnscheduled("AAPL");
            runTradingAlgorithmUnscheduled("X:BTCUSD");

            List<String> stockTickers = Arrays.asList("AAPL","GOOGL");
            List<String> cryptoTickers = Arrays.asList("BTC-USD","ETH-USD");
            runTradingAlgorithmLive(stockTickers);
            runTradingAlgorithmLive(cryptoTickers);
        };
    }

    public void runTradingAlgorithmUnscheduled(String ticker) {
        BackTesting backTesting = new BackTesting();
        PortfolioTypeEnum portfolioType = PortfolioTypeEnum.AGGRESSIVE;
        marketDataService.getHistoricalMarketData(ticker)
                .subscribe(stockData -> {
                            List<Object> objects = stockData.get("close");
                            List<BigDecimal> pricePredictions = objects.stream()
                                    .map(price -> (BigDecimal) price)
                                    .collect(Collectors.toList()); //TODO: Predictions == history for now

                            TradingAlgorithm tradingAlgorithm = new TradingAlgorithmOne(ticker, portfolioType, moneyPoolService);
                            backTesting.run(tradingAlgorithm, pricePredictions, stockData);
                        },
                        error -> {
                            System.err.println("Error fetching market data: " + error.getMessage());
                            error.printStackTrace();
                        }
                );
    }

    public void runTradingAlgorithmLive(List<String> tickers) {
        PortfolioTypeEnum portfolioType = PortfolioTypeEnum.AGGRESSIVE;
        marketDataService.subscribeToLiveMarketData(tickers);
        for (String ticker : tickers) {
            TradingAlgorithm tradingAlgorithm = new TradingAlgorithmOne(ticker, portfolioType, moneyPoolService);
            tradingAlgorithm.subscribeToMarketData(marketDataService.getLiveMarketDataFlux());
        }


    }


    @Scheduled(cron = "0 */10 * * * *") // Runs every 10 minutes
    public void runTradingAlgorithm() {
        try {

        } catch (Exception e) {

        }
    }
}
