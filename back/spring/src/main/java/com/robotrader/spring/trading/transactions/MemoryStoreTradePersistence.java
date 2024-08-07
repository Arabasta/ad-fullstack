package com.robotrader.spring.trading.transactions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.interfaces.TradePersistence;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class MemoryStoreTradePersistence implements TradePersistence {
    private final List<TradeTransaction> tradeTransactions = new ArrayList<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void saveTrade(TradeTransaction tradeTransaction) {
        tradeTransactions.add(tradeTransaction);
    }

    @Override
    public List<ObjectNode> getAllTrades() {
        return tradeTransactions.stream()
                .map(this::convertToObjectNode)
                .collect(Collectors.toList());
    }

    private ObjectNode convertToObjectNode(TradeTransaction tradeTransaction) {
        ObjectNode node = objectMapper.createObjectNode();
        node.put("transactionId", tradeTransaction.getTransactionId());
        node.put("ticker", tradeTransaction.getTicker());
        node.put("action", tradeTransaction.getAction());
        node.put("transactionDateTime", tradeTransaction.getTransactionDateTime().format(DATE_TIME_FORMATTER));
        node.put("transactionQuantity", tradeTransaction.getTransactionQuantity());
        node.put("transactionPrice", tradeTransaction.getTransactionPrice());
        node.put("transactionAmount", tradeTransaction.getTransactionAmount());
        node.put("portfolioType", tradeTransaction.getPortfolioType().ordinal());
        return node;
    }
}

