package com.robotrader.spring.trading.transactions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.robotrader.spring.model.log.TradeTransactionLog;
import com.robotrader.spring.service.log.TradeTransactionLogService;
import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.interfaces.TradePersistence;

import java.util.List;
import java.util.stream.Collectors;

public class DatabaseStoreTradePersistence implements TradePersistence {
    private final TradeTransactionLogService transactionLogService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public DatabaseStoreTradePersistence(TradeTransactionLogService transactionLogService) {
        this.transactionLogService = transactionLogService;
    }

    @Override
    public void saveTrade(TradeTransaction transaction) {
        transactionLogService.log(transaction);
    }

    @Override
    public List<ObjectNode> getAllTrades() {
        List<TradeTransactionLog> transactionLogs = transactionLogService.getAllTradeTransactionLogs();
        return transactionLogs.stream()
                .map(this::convertToObjectNode)
                .collect(Collectors.toList());
    }

    private ObjectNode convertToObjectNode(TradeTransactionLog tradeTransaction) {
        ObjectNode node = objectMapper.createObjectNode();
        node.put("transactionId", tradeTransaction.getTransactionId());
        node.put("ticker", tradeTransaction.getTicker());
        node.put("action", tradeTransaction.getAction());
        node.put("transactionDateTime", tradeTransaction.getTransactionDateTime().format(DATE_TIME_FORMATTER));
        node.put("transactionQuantity", tradeTransaction.getTransactionQuantity());
        node.put("transactionPrice", tradeTransaction.getTransactionPrice());
        node.put("portfolioType", tradeTransaction.getPortfolioType().ordinal());
        return node;
    }
}
