package com.robotrader.spring.trading.interfaces;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.robotrader.spring.trading.dto.TradeTransaction;

import java.time.format.DateTimeFormatter;
import java.util.List;

public interface TradePersistence<T> {
    DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
    void saveTrade(TradeTransaction tradeTransaction);
    List<ObjectNode> getAllTrades();
}
