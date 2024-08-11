package com.robotrader.spring.trading.algorithm.movingAverage;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

public class TradingAlgorithmMASimple extends TradingAlgorithmMABase {
    public static final String ALGORITHM_TYPE = "SIMPLE_MOVING_AVERAGE_CROSSOVER";

    public TradingAlgorithmMASimple(String ticker, PortfolioTypeEnum portfolioType, MoneyPoolService moneyPoolService) {
        super(ticker, portfolioType, moneyPoolService);
    }


    @Override
    protected BigDecimal calculateMovingAverage(List<BigDecimal> prices, int window) {
        if (prices.size() < window) {
            throw new IllegalArgumentException("Not enough data points to calculate MA");
        }

        BigDecimal sum = BigDecimal.ZERO;
        for (int i = 0; i < window; i++) {
            sum = sum.add(prices.get(i));
        }
        return sum.divide(BigDecimal.valueOf(window), RoundingMode.HALF_UP);
    }
}