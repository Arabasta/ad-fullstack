package com.robotrader.spring.trading.algorithm.trendFollowing;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class TradingAlgorithmTFHF extends TradingAlgorithmTFBase {
    public static final String ALGORITHM_TYPE = "TREND_FOLLOWING_HIGH_FREQUENCY";

    public TradingAlgorithmTFHF(String ticker, PortfolioTypeEnum portfolioType, MoneyPoolService moneyPoolService) {
        super(ticker, portfolioType, moneyPoolService);
    }

    @Override
    public BigDecimal calculateStopLossPrice(BigDecimal currentPrice) {
        stopLossAmount = atr.multiply(BigDecimal.valueOf(0.1));
        return currentPrice.subtract(stopLossAmount).setScale(4, RoundingMode.HALF_UP);
    }
}
