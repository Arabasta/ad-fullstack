package com.robotrader.spring.trading.algorithm;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class TradingAlgorithmThree extends TradingAlgorithmOne {
    public static final String ALGORITHM_TYPE = "TREND_FOLLOWING_ATR_FOMO";
    private static final Logger logger = LoggerFactory.getLogger(TradingAlgorithmThree.class);

    public TradingAlgorithmThree(String ticker, PortfolioTypeEnum portfolioType, MoneyPoolService moneyPoolService) {
        super(ticker, portfolioType, moneyPoolService);
    }

    @Override
    public BigDecimal positionSizing(BigDecimal risk) {
        // 14-day ATR
        int atrPeriod = 14;

        if (priceHistory.get("close").size() < atrPeriod + 1) { // Need a atrPeriod + 1 window
            logger.info("Insufficient number of to make a trade decision, no. of data: {}", atrPeriod);
            return BigDecimal.ZERO;
        }
        atr = super.getATR(priceHistory, atrPeriod);
        stopLossPrice = calculateStopLossPrice(currentPrice);

        // Determine available capital
        BigDecimal availableCapital = isTest ? currentCapitalTest : moneyPoolService.findByPortfolioType(portfolioType).getPoolBalance();

        // Calculate adjusted risk based on stop loss size
        BigDecimal adjustedRisk = calculateAdjustedRisk(risk, stopLossAmount, currentPrice);

        // Calculate raw position size using adjusted risk
        BigDecimal rawPositionSize = availableCapital.multiply(adjustedRisk).divide(stopLossAmount, 8, RoundingMode.HALF_UP);

        // Calculate the total cost of the trade
        BigDecimal totalCost = currentPrice.multiply(rawPositionSize);

        if (isTest && totalCost.compareTo(currentCapitalTest) > 0 || !isTest && totalCost.compareTo(availableCapital) > 0) {
            return availableCapital.multiply(BigDecimal.valueOf(0.8)).divide(currentPrice, RoundingMode.HALF_UP);
        } else {
            return applyPriceBasedScaling(rawPositionSize, currentPrice, HIGH_PRICE_THRESHOLD);
        }
    }
}
