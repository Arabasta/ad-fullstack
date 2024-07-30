package com.robotrader.spring.trading.interfaces;

import com.robotrader.spring.trading.dto.TradeTransaction;

import java.util.List;

public interface TradePersistence {
    void saveTrade(TradeTransaction tradeTransaction);
    TradeTransaction readTrade();
    List<TradeTransaction> readAllTrades();
}
