package com.robotrader.spring.trading;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.robotrader.spring.aws.s3.S3TransactionLogger;
import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.interfaces.TradePersistence;

import java.util.List;
import java.util.Optional;

public class ObjectStoreTradePersistence implements TradePersistence {
private final S3TransactionLogger s3TransactionLogger;

    public ObjectStoreTradePersistence(Optional<S3TransactionLogger> s3TransactionLogger) {
        this.s3TransactionLogger = s3TransactionLogger.orElse(null);
    }

    @Override
    public void saveTrade(TradeTransaction tradeTransaction) {
        if (s3TransactionLogger != null) {
            s3TransactionLogger.logTradeTransaction(tradeTransaction);
        }

    }

    @Override
    public List<ObjectNode> getAllTrades() {
        if (s3TransactionLogger != null) {
            return s3TransactionLogger.getAllTradeTransactions(Integer.MAX_VALUE);
        }
        return null;
    }
}
