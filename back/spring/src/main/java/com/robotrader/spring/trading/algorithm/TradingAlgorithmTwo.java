package com.robotrader.spring.trading.algorithm;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;
import com.robotrader.spring.trading.algorithm.base.TradingAlgorithmBase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;

public class TradingAlgorithmTwo extends TradingAlgorithmOne {
    public static final String ALGORITHM_TYPE = "TREND_FOLLOWING_ATR_HIGH_FREQUENCY";
    private static final Logger logger = LoggerFactory.getLogger(TradingAlgorithmTwo.class);

    public TradingAlgorithmTwo(String ticker, PortfolioTypeEnum portfolioType, MoneyPoolService moneyPoolService) {
        super(ticker, portfolioType, moneyPoolService);
    }

    @Override
    public BigDecimal calculateStopLossPrice(BigDecimal currentPrice) {
        stopLossAmount = atr.multiply(BigDecimal.valueOf(0.1));
        return currentPrice.subtract(stopLossAmount).setScale(4, RoundingMode.HALF_UP);
    }
}
