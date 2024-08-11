package com.robotrader.spring.trading.algorithm.movingAverage;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;
import com.robotrader.spring.trading.algorithm.trendFollowing.TradingAlgorithmTFBase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.List;

public abstract class TradingAlgorithmMABase extends TradingAlgorithmTFBase {
    protected int shortWindow;
    protected int longWindow;
    public static final String ALGORITHM_TYPE = "";
    private static final Logger logger = LoggerFactory.getLogger(TradingAlgorithmMABase.class);

    public TradingAlgorithmMABase(String ticker, PortfolioTypeEnum portfolioType, MoneyPoolService moneyPoolService) {
        super(ticker, portfolioType, moneyPoolService);
        shortWindow = 10;
        longWindow = 30;
    }

    @Override
    public boolean checkForBuySignal() {
        logger.debug("{} - Price predictions: {}", ticker, pricePredictions);
        if (isTradeable() && pricePredictions != null) {


            // Ensure there are enough price predictions
            if (pricePredictions.size() < longWindow) {
                logger.info("{} - Not enough price predictions", ticker);
                return false;
            }

            // Calculate moving averages
            BigDecimal shortMA = calculateMovingAverage(pricePredictions, shortWindow);
            BigDecimal longMA = calculateMovingAverage(pricePredictions, longWindow);

            if (shortMA.compareTo(longMA) > 0) {
                logger.debug("{} - Buy signal: Short MA is above Long MA", ticker);
                return true;
            } else {
                logger.debug("{} - No buy signal: Short MA is below Long MA", ticker);
            }
        }
        logger.info("{} - Buy trade rules not met", ticker);
        return false;
    }

    @Override
    public boolean checkForSellSignal() {
        if (isTest) {
            currentPrice = (BigDecimal) priceHistory.get("close").get(0);
        }

        if (isSellable()) {
            if (isStopLossTriggered(currentPrice)) {
                return true;
            }
            BigDecimal shortMA = calculateMovingAverage(pricePredictions, shortWindow);
            BigDecimal longMA = calculateMovingAverage(pricePredictions, longWindow);

            if (shortMA.compareTo(longMA) < 0) {
                logger.debug("{} - Sell signal: Short MA is below Long MA", ticker);
                return true;
            } else {
                logger.info("{} - No sell signal: Short MA is above Long MA", ticker);
            }
        } else {
            logger.info("{} - No open trade to sell", ticker);
        }
        return false;
    }

    @Override
    public BigDecimal positionSizing(BigDecimal risk) {
        return super.positionSizing(risk);
    }

    @Override
    public BigDecimal calculateStopLossPrice(BigDecimal currentPrice) {
        return super.calculateStopLossPrice(currentPrice);
    }

    protected abstract BigDecimal calculateMovingAverage(List<BigDecimal> prices, int window);
}
