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

public class TradingAlgorithmOne extends TradingAlgorithmBase {
    protected BigDecimal atr;
    public static final String ALGORITHM_TYPE = "TREND_FOLLOWING_ATR";
    private static final Logger logger = LoggerFactory.getLogger(TradingAlgorithmOne.class);

    public TradingAlgorithmOne(String ticker, PortfolioTypeEnum portfolioType, MoneyPoolService moneyPoolService) {
        super(ticker, portfolioType, moneyPoolService);
    }

    @Override
    public boolean checkForBuySignal() {
        logger.debug("Price predictions: {}", pricePredictions);
        if (isTradeable() && pricePredictions != null) {
            int window = 37;
            // Not enough prediction data, cannot trade
            if (pricePredictions.size() < window) {
                logger.info("Not enough price predictions");
                return false;
            }

            profitTarget = calculateProfitTargetPrice(currentPrice);

            // True if within the window the predicted price goes above the PT without dropping below the SL
            for (int i = 0; i < window; i++) {
                logger.debug("Price predicted at t{}: {}", i, pricePredictions.get(i));
                if (pricePredictions.get(i).compareTo(stopLossPrice) < 0) {
                    logger.debug("Price prediction: Predicted price below stop loss");
                    return false;
                }
                if (pricePredictions.get(i).compareTo(profitTarget) > 0) {
                    logger.debug("Price prediction: Predicted price above profit target");
                    return true;
                }
            }
            logger.info("Price prediction: Predicted price did not hit the target or stop loss within the prediction window");
        }
        logger.info("Buy trade rules not met");
        return false;
    }

    @Override
    public boolean checkForSellSignal() {
        if (isTest) {
            currentPrice = (BigDecimal) priceHistory.get("close").get(0);
        }

        if (isSellable()) {
            return isStopLossTriggered(currentPrice) || isProfitTargetTriggered(currentPrice);
        }
        return false;
    }

    @Override
    public BigDecimal positionSizing(BigDecimal risk) {
        // 14-day ATR
        int atrPeriod = 14;

        if (priceHistory.get("close").size() < atrPeriod + 1) { // Need a atrPeriod + 1 window
            logger.info("Insufficient number of to make a trade decision, no. of data: {}", atrPeriod);
            return BigDecimal.ZERO;
        }
        atr = getATR(priceHistory, atrPeriod);
        stopLossPrice = calculateStopLossPrice(currentPrice);

        // Determine available capital
        BigDecimal availableCapital = isTest ? currentCapitalTest : moneyPoolService.findByPortfolioType(portfolioType).getPoolBalance();

        // Calculate adjusted risk based on stop loss size
        BigDecimal adjustedRisk = calculateAdjustedRisk(risk, stopLossAmount, currentPrice);

        // Calculate raw position size using adjusted risk
        BigDecimal rawPositionSize = availableCapital.multiply(adjustedRisk).divide(stopLossAmount, 8, RoundingMode.HALF_UP);
        logger.debug("Raw position size: {}", rawPositionSize);
        return applyPriceBasedScaling(rawPositionSize, currentPrice, HIGH_PRICE_THRESHOLD);
    }

    @Override
    public BigDecimal calculateStopLossPrice(BigDecimal currentPrice) {
        stopLossAmount = atr.multiply(BigDecimal.valueOf(1.1));
        return currentPrice.subtract(stopLossAmount).setScale(4, RoundingMode.HALF_UP);
    }

    protected BigDecimal calculateProfitTargetPrice(BigDecimal currentPrice) {
        return currentPrice.add(stopLossAmount.multiply(BigDecimal.valueOf(2))).setScale(4, RoundingMode.HALF_UP);
    }

    protected BigDecimal getATR(Map<String, List<Object>> priceHistory, Integer atrPeriod) {
        List<Object> closePrices = priceHistory.get("close");
        List<Object> highPrices = priceHistory.get("high");
        List<Object> lowPrices = priceHistory.get("low");

        // If back test, ATR calculated from beginning of data. If live test, ATR calculated from recent history
        int dataSize = closePrices.size();
        int startIndex = isTest ? 0 : dataSize - atrPeriod - 1;
        int endIndex = isTest ? atrPeriod : dataSize - 1;

        BigDecimal sum = BigDecimal.ZERO;
        for (int i = startIndex + 1; i <= endIndex; i ++) {
            BigDecimal prevClosePrice = (BigDecimal) closePrices.get(i - 1);
            BigDecimal highPrice = (BigDecimal) highPrices.get(i);
            BigDecimal lowPrice = (BigDecimal) lowPrices.get(i);

            BigDecimal tr1 = highPrice.subtract(lowPrice);
            BigDecimal tr2 = (highPrice.subtract(prevClosePrice)).abs();
            BigDecimal tr3 = (lowPrice.subtract(prevClosePrice)).abs();
            BigDecimal dailyMax = tr1.max(tr2).max(tr3);
            sum = sum.add(dailyMax);
        }
        BigDecimal atr = sum.divide(BigDecimal.valueOf(atrPeriod), RoundingMode.HALF_UP);
        logger.debug("ATR: {}", atr);
        return atr;
    }

    protected boolean isProfitTargetTriggered(BigDecimal currentPrice) {
        return currentPrice.compareTo(profitTarget) > 0;
    }

    protected BigDecimal applyPriceBasedScaling(BigDecimal rawPositionSize, BigDecimal currentPrice, BigDecimal highPriceThreshold) {
        if (currentPrice.compareTo(highPriceThreshold) > 0) {
            return rawPositionSize.setScale(2, RoundingMode.HALF_UP);
        } else {
            return rawPositionSize.setScale(0, RoundingMode.HALF_UP);
        }
    }
}
