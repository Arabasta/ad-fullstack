package com.robotrader.spring.trading.interfaces;

import com.robotrader.spring.trading.algorithm.base.TradingAlgorithmBase;
import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.service.MarketDataService;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface TradingStrategy {
    CompletableFuture<Void> execute(TradingAlgorithmBase tradingAlgorithmBase, MarketDataService marketDataService);
    void processTrade(TradeTransaction tradeTransaction);
    String processTicker(String ticker);
    List<TradeTransaction> getTradeResults();
}
