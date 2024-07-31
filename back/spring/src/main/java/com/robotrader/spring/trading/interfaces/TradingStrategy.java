package com.robotrader.spring.trading.interfaces;

import com.robotrader.spring.trading.algorithm.TradingAlgorithm;
import com.robotrader.spring.trading.dto.MarketData;
import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.service.MarketDataService;

import java.util.List;

public interface TradingStrategy {
    void execute(TradingAlgorithm tradingAlgorithm, MarketDataService marketDataService);
    void processTrade(TradeTransaction tradeTransaction);
    String processTicker(String ticker);
}
