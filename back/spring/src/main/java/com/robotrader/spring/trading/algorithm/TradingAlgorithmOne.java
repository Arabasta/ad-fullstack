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
                return false;
            }
            atr = getATR(priceHistory);
            position = positionSizing(AGGRESSIVE_RISK); // TODO: Should this be in isTradeable to check sufficient capital
            stopLoss = calculateStopLoss(currentPrice);
            profitTarget = calculateProfitTarget(currentPrice);

            System.out.println("Current price: " + priceHistory.get("close").get(0));
            System.out.println("Stop loss: " + stopLoss);
            System.out.println("Profit target: " + profitTarget);

            for (int i = 0; i < window; i++) {
                System.out.println("Price predicted at " + i + ": " + pricePredictions.get(i));
                if (pricePredictions.get(i).compareTo(stopLoss) < 0) {
                    return false;
                }
                if (pricePredictions.get(i).compareTo(profitTarget) > 0) {
                    return true;
                }
            }
        }
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
    public Integer positionSizing(BigDecimal risk) {
        BigDecimal divisor = atr.multiply(BigDecimal.valueOf(1.1));
        if (isTest) {
            Integer positionSize = ((capitalTest.multiply(risk)).divide(divisor, 4, RoundingMode.HALF_UP)).intValue();
            return positionSize;
        } else {
            MoneyPool moneyPool = moneyPoolService.findByPortfolioType(portfolioType);
            BigDecimal portfolioBalance = moneyPool.getPoolBalance();
            Integer positionSize = ((portfolioBalance.multiply(risk)).divide(divisor, 4, RoundingMode.HALF_UP)).intValue();
            return positionSize;
        }
    }

    @Override
    public BigDecimal calculateStopLoss(BigDecimal currentPrice) {
        return currentPrice.subtract(atr.multiply(BigDecimal.valueOf(1.1))).setScale(4, RoundingMode.HALF_UP);
    }

    private BigDecimal calculateProfitTarget(BigDecimal currentPrice) {
        return currentPrice.add(atr.multiply(BigDecimal.valueOf(2))).setScale(4, RoundingMode.HALF_UP);
    }

    private BigDecimal getATR(Map<String, List<Object>> stockPriceHistory) {
        List<Object> closePrices = stockPriceHistory.get("close");
        List<Object> highPrices = stockPriceHistory.get("high");
        List<Object> lowPrices = stockPriceHistory.get("low");
        // 14-day ATR
        Integer atrPeriod = 14;
        BigDecimal sum = BigDecimal.ZERO;
        for (int i = 1; i < atrPeriod + 1; i ++) {
            BigDecimal prevClosePrice = (BigDecimal) closePrices.get(i - 1);
            BigDecimal highPrice = (BigDecimal) highPrices.get(i);
            BigDecimal lowPrice = (BigDecimal) lowPrices.get(i);

            BigDecimal dailyMax = highPrice.subtract(lowPrice)
                    .max((highPrice.subtract(prevClosePrice)).abs())
                    .max((lowPrice.subtract(prevClosePrice)).abs());
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
}
