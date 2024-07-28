package com.robotrader.spring.trading.algorithm;

import com.robotrader.spring.model.MoneyPool;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;

public class TradingAlgorithmOne extends TradingAlgorithm {
    private BigDecimal atr;

    public TradingAlgorithmOne(String ticker, PortfolioTypeEnum portfolioType, MoneyPoolService moneyPoolService) {
        super(ticker, portfolioType, moneyPoolService);
    }

    @Override
    public boolean checkForBuySignal() {

        if (isTradeable()) {
            Integer window = 20; // TODO: Assumed prediction data size is 20 for now, depending on model output
            // Not enough prediction data, cannot trade
            if (pricePredictions.size() < window) {
                System.out.println("Not enough price predictions");
                return false;
            }

            profitTarget = calculateProfitTargetPrice(currentPrice);

            // True if within the window the predicted price goes above the PT without dropping below the SL
            for (int i = 0; i < window; i++) {
                System.out.println("Price predicted at t" + i + ": " + pricePredictions.get(i));
                if (pricePredictions.get(i).compareTo(stopLossPrice) < 0) {
                    System.out.println("Price prediction: Predicted price below stop loss");
                    return false;
                }
                if (pricePredictions.get(i).compareTo(profitTarget) > 0) {
                    System.out.println("Price prediction: Predicted price above profit target");
                    return true;
                }
            }
            System.out.println("Price prediction: Predicted price did not hit the target or stop loss within the prediction window");
        }
        System.out.println("Trade rules not met");
        return false;
    }

    @Override
    public boolean checkForSellSignal() {
        currentPrice = (BigDecimal) priceHistory.get("close").get(0);
        if (isSellable()) {
            return isStopLossTriggered(currentPrice) || isProfitTargetTriggered(currentPrice);
        }
        return false;
    }

    @Override
    public BigDecimal positionSizing(BigDecimal risk) {
        // 14-day ATR
        Integer atrPeriod = 14;
        if (priceHistory.get("close").size() < atrPeriod + 1) { // Need a atrPeriod + 1 window
            System.out.println("Insufficient number of to make a trade decision, no. of data: " + atrPeriod);
            return BigDecimal.ZERO;
        }
        atr = getATR(priceHistory, atrPeriod);
        stopLossPrice = calculateStopLossPrice(currentPrice);

        // Determine available capital
        BigDecimal availableCapital = isTest ? capitalTest : moneyPoolService.findByPortfolioType(portfolioType).getPoolBalance();

        // Calculate raw position size
        BigDecimal rawPositionSize = availableCapital.multiply(risk).divide(stopLossAmount, 8, RoundingMode.HALF_UP);
        return applyPriceBasedScaling(rawPositionSize, currentPrice, HIGH_PRICE_THRESHOLD);
    }

    @Override
    public BigDecimal calculateStopLossPrice(BigDecimal currentPrice) {
        stopLossAmount = atr.multiply(BigDecimal.valueOf(1.1));
        return currentPrice.subtract(stopLossAmount).setScale(4, RoundingMode.HALF_UP);
    }

    private BigDecimal calculateProfitTargetPrice(BigDecimal currentPrice) {
        return currentPrice.add(stopLossAmount.multiply(BigDecimal.valueOf(2))).setScale(4, RoundingMode.HALF_UP);
    }

    private BigDecimal getATR(Map<String, List<Object>> priceHistory, Integer atrPeriod) {
        List<Object> closePrices = priceHistory.get("close");
        List<Object> highPrices = priceHistory.get("high");
        List<Object> lowPrices = priceHistory.get("low");

        BigDecimal sum = BigDecimal.ZERO;
        for (int i = 1; i < atrPeriod + 1; i ++) {
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
        return atr;
    }

    private boolean isProfitTargetTriggered(BigDecimal currentPrice) {
        if (currentPrice.compareTo(profitTarget) > 0){
            return true;
        }
        return false;
    }

    private BigDecimal applyPriceBasedScaling(BigDecimal rawPositionSize, BigDecimal currentPrice, BigDecimal highPriceThreshold) {
        if (currentPrice.compareTo(highPriceThreshold) > 0) {
            return rawPositionSize.setScale(2, RoundingMode.HALF_UP);
        } else {
            return rawPositionSize.setScale(0, RoundingMode.HALF_UP);
        }
    }
}
