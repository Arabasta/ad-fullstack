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
    private List<String> cryptoTickers;
    private List<String> stockTickers;

    @Autowired
    public TradingApplication(MarketDataService marketDataService, MoneyPoolService moneyPoolService) {
        this.marketDataService = marketDataService;
        this.moneyPoolService = moneyPoolService;
        stockTickers = Arrays.asList("AAPL","GOOGL");
        cryptoTickers = Arrays.asList("BTC-USD","ETH-USD");
    }

    @Bean
    public CommandLineRunner commandLineRunner() {
        return args -> {

            runTradingAlgorithmUnscheduled("AAPL");

            runTradingAlgorithmLive();

        };
    }

    public void runTradingAlgorithmUnscheduled(String stockTicker) {
        BackTesting backTesting = new BackTesting();
        PortfolioTypeEnum portfolioType = PortfolioTypeEnum.AGGRESSIVE;
        marketDataService.getHistoricalStockData(stockTicker)
                .subscribe(stockData -> {
                            List<Object> objects = stockData.get("close");
                            List<BigDecimal> pricePredictions = objects.stream()
                                    .map(price -> (BigDecimal) price)
                                    .collect(Collectors.toList()); //TODO: Predictions == history for now

                            TradingAlgorithm tradingAlgorithm = new TradingAlgorithmOne(stockTicker, portfolioType, moneyPoolService);
                            backTesting.run(tradingAlgorithm, pricePredictions, stockData);
                        },
                        error -> {
                            System.err.println("Error fetching market data: " + error.getMessage());
                            error.printStackTrace();
                        }
                );
    }

    public void runTradingAlgorithmLive() {
        marketDataService.getLiveCryptoData(cryptoTickers);
        marketDataService.getLiveStockData(stockTickers);
    }


    @Scheduled(cron = "0 */10 * * * *") // Runs every 10 minutes
    public void runTradingAlgorithm() {
        try {

        } catch (Exception e) {

        }
    }
}
