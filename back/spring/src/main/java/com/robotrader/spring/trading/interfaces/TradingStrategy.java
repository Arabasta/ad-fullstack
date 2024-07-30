package com.robotrader.spring.trading.interfaces;

import com.robotrader.spring.trading.algorithm.base.TradingAlgorithmBase;
import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.service.MarketDataService;

public interface TradingStrategy {
    void execute(TradingAlgorithmBase tradingAlgorithmBase, MarketDataService marketDataService);
    void processTrade(TradeTransaction tradeTransaction);
    String processTicker(String ticker);
}
