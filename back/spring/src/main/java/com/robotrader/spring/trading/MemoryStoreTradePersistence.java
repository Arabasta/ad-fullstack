package com.robotrader.spring.trading;

import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.interfaces.TradePersistence;

import java.util.ArrayList;
import java.util.List;

public class MemoryStoreTradePersistence implements TradePersistence {
    private final List<TradeTransaction> tradeTransactions = new ArrayList<>();

    @Override
    public void saveTrade(TradeTransaction tradeTransaction) {
        tradeTransactions.add(tradeTransaction);
    }

    @Override
    public TradeTransaction readTrade() {
        return null;
    }

    @Override
    public List<TradeTransaction> readAllTrades() {
        return new ArrayList<>(tradeTransactions);
    }
}
