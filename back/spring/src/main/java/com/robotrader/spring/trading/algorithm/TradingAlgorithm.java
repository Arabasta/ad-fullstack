package com.robotrader.spring.trading.algorithm;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.MoneyPoolService;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public abstract class TradingAlgorithm {
    @Getter
    @Setter
    protected List<BigDecimal> pricePredictions;
    @Getter
    @Setter
    protected Map<String,List<BigDecimal>> priceHistory;
    protected PortfolioTypeEnum portfolioType;
    protected final MoneyPoolService moneyPoolService;

    public TradingAlgorithm(PortfolioTypeEnum portfolioType, MoneyPoolService moneyPoolService) {
        this.portfolioType = portfolioType;
        this.moneyPoolService = moneyPoolService;
    }

    public abstract boolean checkForBuySignal();

    public abstract boolean checkForSellSignal();

    // Position Sizing
    public abstract Integer positionSizing(double risk);

    // Determining stop loss
    public abstract BigDecimal calculateStopLoss(BigDecimal currentPrice);

    public void execute() {
        if (checkForBuySignal() && isTradeable()) {
            executeBuyTrade();
            System.out.println("Buy signal: " + true);
        }
        else {
            System.out.println("Buy signal: " + false);
        }
        if (checkForSellSignal() && isSellable()) {
            executeSellTrade();
            System.out.println("Sell signal: " + false);
        }
    }


    // Risk management. max trades/day, prediction confidence level
    public boolean isTradeable(){
        return true;
    }

    // Buy trade
    // Call API for live price
    // Store in S3
    public void executeBuyTrade(){

    }



    // Sell trade
    // Check if sufficient amount to sell
    // Call API for live price
    // Store in S3
    public void executeSellTrade(){

    }

    public boolean isSellable(){
        return true;
    }

    // Below 2 are continuously running on streamed live data
    // Stop loss
    // Requires live data

    // Profit taker
    // Requires live data


}
