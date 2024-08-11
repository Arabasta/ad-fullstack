package com.robotrader.spring.trading.strategy;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.robotrader.spring.trading.algorithm.base.TradingAlgorithmBase;
import com.robotrader.spring.trading.interfaces.TradingStrategy;
import com.robotrader.spring.trading.service.HistoricalMarketDataService;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public class TradingContext {
    private TradingStrategy strategy;
    private TradingAlgorithmBase algorithm;

    public TradingContext() {}

    public void setStrategy(TradingStrategy strategy) {
        this.strategy = strategy;
    }

    public CompletableFuture<Void> executeTradingStrategy(TradingAlgorithmBase algorithm) {
        this.algorithm = algorithm;
        return strategy.execute(algorithm);
    }

    public List<ObjectNode> getTradeResults() {
        return strategy.getTradeResults();
    }

    public void stop() {
        strategy.stop();
    }

    public void setBuySignalTrigger() {
        algorithm.setLiveTradeBuySignalTrigger(true);
    }
}