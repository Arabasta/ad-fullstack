package com.robotrader.spring.trading.application;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;
import com.robotrader.spring.trading.BackTesting;
import com.robotrader.spring.trading.MarketData;
import com.robotrader.spring.trading.algorithm.TradingAlgorithm;
import com.robotrader.spring.trading.algorithm.TradingAlgorithmOne;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TradingApplication {
    private final MarketData marketData;
    private final MoneyPoolService moneyPoolService;

    @Autowired
    public TradingApplication(MarketData marketData, MoneyPoolService moneyPoolService) {
        this.marketData = marketData;
        this.moneyPoolService = moneyPoolService;
    }

    @Bean
    public CommandLineRunner commandLineRunner() {
        return args -> {

        runTradingAlgorithmUnscheduled("AAPL");

        };
    }

    public void runTradingAlgorithmUnscheduled(String stockTicker) {
        BackTesting backTesting = new BackTesting();
        PortfolioTypeEnum portfolioType = PortfolioTypeEnum.AGGRESSIVE;
        marketData.getHistoricalMarketData(stockTicker)
                .subscribe(stockData -> {
                            List<Object> objects = stockData.get("close");
                            List<BigDecimal> pricePredictions = objects.stream()
                                    .map(price -> (BigDecimal) price)
                                    .collect(Collectors.toList()); //TODO: Predictions == history for now

                            TradingAlgorithm tradingAlgorithm = new TradingAlgorithmOne(stockTicker, portfolioType, moneyPoolService);
                            backTesting.run(tradingAlgorithm, pricePredictions, stockData);
                        },
                        error -> System.err.println("Error fetching market data: " + error.getMessage())
                );
    }


    @Scheduled(cron = "0 */10 * * * *") // Runs every 10 minutes
    public void runTradingAlgorithm() {
        try {

        } catch (Exception e) {

        }
    }
}
