package com.robotrader.spring.trading.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class TradeTransaction {
    private String transactionId;
    private String ticker;
    private String action;
    private Long transactionTimestamp;
    private BigDecimal transactionQuantity;
    private BigDecimal transactionPrice;

    public TradeTransaction() {}

    public TradeTransaction(String ticker, Long transactionTimestamp, BigDecimal transactionQuantity, BigDecimal transactionPrice, String action) {
        this.transactionId = UUID.randomUUID().toString();
        this.ticker = ticker;
        this.action = action;
        this.transactionTimestamp = transactionTimestamp;
        this.transactionQuantity = transactionQuantity;
        this.transactionPrice = transactionPrice;
    }

    @Override
    public String toString() {
        return "TradeTransaction{" +
                "transactionId='" + transactionId + '\'' +
                ", ticker='" + ticker + '\'' +
                ", action='" + action + '\'' +
                ", transactionTimestamp=" + transactionTimestamp +
                ", transactionQuantity=" + transactionQuantity +
                ", transactionPrice=" + transactionPrice +
                ", transactionAmount=" + transactionPrice.multiply(transactionQuantity) +
                '}';
    }
}
