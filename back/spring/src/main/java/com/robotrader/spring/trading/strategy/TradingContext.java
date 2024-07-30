package com.robotrader.spring.trading.strategy;

import com.robotrader.spring.trading.algorithm.base.TradingAlgorithmBase;
import com.robotrader.spring.trading.interfaces.TradingStrategy;
import com.robotrader.spring.trading.service.MarketDataService;

public class TradingContext {
    private TradingStrategy strategy;
    private final MarketDataService marketDataService;

    public TradingContext(MarketDataService marketDataService) {
        this.marketDataService = marketDataService;
    }

    public void setStrategy(TradingStrategy strategy) {
        this.strategy = strategy;
    }

    public void executeTradingStrategy(TradingAlgorithmBase algorithm) {
        strategy.execute(algorithm, marketDataService);
    }
}