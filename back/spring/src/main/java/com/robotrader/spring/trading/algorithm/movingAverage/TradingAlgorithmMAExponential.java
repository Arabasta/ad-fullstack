package com.robotrader.spring.trading.algorithm.movingAverage;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

public class TradingAlgorithmMAExponential extends TradingAlgorithmMABase {
    public static final String ALGORITHM_TYPE = "EXPONENTIAL_MOVING_AVERAGE_CROSSOVER";

    public TradingAlgorithmMAExponential(String ticker, PortfolioTypeEnum portfolioType, MoneyPoolService moneyPoolService) {
        super(ticker, portfolioType, moneyPoolService);
    }

    @Override
    protected BigDecimal calculateMovingAverage(List<BigDecimal> prices, int window) {
        if (prices.size() < window) {
            throw new IllegalArgumentException("Not enough data points to calculate MA");
        }

        // Calculate the simple moving average
        BigDecimal initialSMA = BigDecimal.ZERO;
        for (int i = 0; i < window; i++) {
            initialSMA = initialSMA.add(prices.get(i));
        }
        initialSMA = initialSMA.divide(BigDecimal.valueOf(window), RoundingMode.HALF_UP);

        // Calculate the multiplier for weighting the EMA
        BigDecimal multiplier = BigDecimal.valueOf(2).divide(BigDecimal.valueOf(window + 1), RoundingMode.HALF_UP);

        // Start with the initial SMA as the first EMA value
        BigDecimal ema = initialSMA;

        // Calculate EMA for the remaining prices
        for (int i = window; i < prices.size(); i++) {
            ema = prices.get(i).subtract(ema).multiply(multiplier).add(ema);
        }

        return ema.setScale(2, RoundingMode.HALF_UP);
    }
}