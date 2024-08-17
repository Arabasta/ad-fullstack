package com.robotrader.spring.trading.interfaces;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.robotrader.spring.trading.algorithm.base.TradingAlgorithmBase;
import com.robotrader.spring.trading.dto.TradeTransaction;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface TradingStrategy {
    CompletableFuture<Void> execute(TradingAlgorithmBase tradingAlgorithmBase);
    void processTrade(TradeTransaction tradeTransaction);
    String processTicker(String ticker);
    List<ObjectNode> getTradeResults();
    void stop();
}
