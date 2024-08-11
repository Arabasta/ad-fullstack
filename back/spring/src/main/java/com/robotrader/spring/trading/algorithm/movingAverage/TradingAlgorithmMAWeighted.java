package com.robotrader.spring.trading.algorithm.movingAverage;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

public class TradingAlgorithmMAWeighted extends TradingAlgorithmMABase{
    public static final String ALGORITHM_TYPE = "WEIGHTED_MOVING_AVERAGE_CROSSOVER";

    public TradingAlgorithmMAWeighted(String ticker, PortfolioTypeEnum portfolioType, MoneyPoolService moneyPoolService) {
        super(ticker, portfolioType, moneyPoolService);
    }

    @Override
    protected BigDecimal calculateMovingAverage(List<BigDecimal> prices, int window) {
        if (prices.size() < window) {
            throw new IllegalArgumentException("Not enough data points to calculate MA");
        }

        BigDecimal sum = BigDecimal.ZERO;
        BigDecimal weightSum = BigDecimal.ZERO;

        for (int i = 0; i < window; i++) {
            BigDecimal price = prices.get(i);
            BigDecimal weight = BigDecimal.valueOf(i + 1); // Lower weights for older predictions
            sum = sum.add(price.multiply(weight));
            weightSum = weightSum.add(weight);
        }
        return sum.divide(weightSum, RoundingMode.HALF_UP);
    }
}
