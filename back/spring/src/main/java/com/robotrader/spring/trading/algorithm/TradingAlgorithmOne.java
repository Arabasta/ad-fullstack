package com.robotrader.spring.trading.algorithm;

import com.robotrader.spring.model.MoneyPool;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;

public class TradingAlgorithmOne extends TradingAlgorithm {
    private BigDecimal stopLoss;
    private BigDecimal profitTarget;
    private BigDecimal atr;


    public TradingAlgorithmOne(PortfolioTypeEnum portfolioType, MoneyPoolService moneyPoolService) {
        super(portfolioType, moneyPoolService);
    }

    @Override
    public boolean checkForBuySignal() {
        Integer window = 20; // TODO: Assumed prediction data size is 20 for now, depending on model output
        // Not enough prediction data, cannot trade
        if (pricePredictions.size() < window){
            return false;
        }
        atr = getATR(priceHistory);
        stopLoss = calculateStopLoss(priceHistory.get("close").get(0));
        profitTarget = calculateProfitTarget(priceHistory.get("close").get(0));

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
        return false;

    }

    @Override
    public boolean checkForSellSignal() {
        return false;
    }

    @Override
    public Integer positionSizing(double risk) {
        MoneyPool moneyPool = moneyPoolService.findByPortfolioType(portfolioType);
        BigDecimal portfolioBalance = moneyPool.getPoolBalance();
        Integer positionSize = (portfolioBalance.multiply(BigDecimal.valueOf(risk))).divide(stopLoss).intValue();
        return positionSize;
    }

    @Override
    public BigDecimal calculateStopLoss(BigDecimal currentPrice) {
        return currentPrice.subtract(atr.multiply(BigDecimal.valueOf(1.1)));
    }

    private BigDecimal calculateProfitTarget(BigDecimal currentPrice) {
        return currentPrice.add(atr.multiply(BigDecimal.valueOf(2)));
    }

    private BigDecimal getATR(Map<String, List<BigDecimal>> stockPriceHistory) {
        List<BigDecimal> closePrices = stockPriceHistory.get("close");
        List<BigDecimal> highPrices = stockPriceHistory.get("high");
        List<BigDecimal> lowPrices = stockPriceHistory.get("low");
        // 14-day ATR
        Integer atrPeriod = 14;
        BigDecimal sum = BigDecimal.ZERO;
        for (int i = 1; i < atrPeriod + 1; i ++) {
            BigDecimal prevClosePrice = closePrices.get(i - 1);
            BigDecimal highPrice = highPrices.get(i);
            BigDecimal lowPrice = lowPrices.get(i);

            BigDecimal dailyMax = highPrice.subtract(lowPrice)
                    .max((highPrice.subtract(prevClosePrice)).abs())
                    .max((lowPrice.subtract(prevClosePrice)).abs());
            sum = sum.add(dailyMax);
        }
        BigDecimal atr = sum.divide(BigDecimal.valueOf(atrPeriod), RoundingMode.HALF_UP);
        return atr;
    }
}
