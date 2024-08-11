package com.robotrader.spring.trading.algorithm.trendFollowing;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class TradingAlgorithmTFFMHF extends TradingAlgorithmTFFM {
    public static final String ALGORITHM_TYPE = "TREND_FOLLOWING_FOMO_HIGH_FREQUENCY";

    public TradingAlgorithmTFFMHF(String ticker, PortfolioTypeEnum portfolioType, MoneyPoolService moneyPoolService) {
        super(ticker, portfolioType, moneyPoolService);
    }

    @Override
    public BigDecimal calculateStopLossPrice(BigDecimal currentPrice) {
        stopLossAmount = atr.multiply(BigDecimal.valueOf(0.1));
        return currentPrice.subtract(stopLossAmount).setScale(4, RoundingMode.HALF_UP);
    }
}
