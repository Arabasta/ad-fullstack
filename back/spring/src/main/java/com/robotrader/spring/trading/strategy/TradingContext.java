package com.robotrader.spring.trading.strategy;

import com.robotrader.spring.trading.algorithm.base.TradingAlgorithmBase;
import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.interfaces.TradingStrategy;
import com.robotrader.spring.trading.service.MarketDataService;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public class TradingContext {
    private TradingStrategy strategy;
    private final MarketDataService marketDataService;

    public TradingContext(MarketDataService marketDataService) {
        this.marketDataService = marketDataService;
    }

    public void setStrategy(TradingStrategy strategy) {
        this.strategy = strategy;
    }

    public CompletableFuture executeTradingStrategy(TradingAlgorithmBase algorithm) {
        return strategy.execute(algorithm, marketDataService);
    }

    public List<TradeTransaction> getTradeResults() {
        return strategy.getTradeResults();
    }

}