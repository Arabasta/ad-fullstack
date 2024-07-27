package com.robotrader.spring.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class TradeTransaction {
    private String transactionId;
    private String stockSymbol;
    private String action;
    private Long transactionTimestamp;
    private Integer transactionQuantity;
    private BigDecimal transactionPrice;

    public TradeTransaction() {}

    public TradeTransaction(String stockSymbol, Long transactionTimestamp, Integer transactionQuantity, BigDecimal transactionPrice, String action) {
        this.transactionId = UUID.randomUUID().toString();
        this.stockSymbol = stockSymbol;
        this.action = action;
        this.transactionTimestamp = transactionTimestamp;
        this.transactionQuantity = transactionQuantity;
        this.transactionPrice = transactionPrice;
    }

    @Override
    public String toString() {
        return "TradeTransaction{" +
                "transactionId='" + transactionId + '\'' +
                ", stockSymbol='" + stockSymbol + '\'' +
                ", action='" + action + '\'' +
                ", transactionTimestamp=" + transactionTimestamp +
                ", transactionQuantity=" + transactionQuantity +
                ", transactionPrice=" + transactionPrice +
                ", transactionAmount=" + transactionPrice.multiply(BigDecimal.valueOf(transactionQuantity)) +
                '}';
    }
}
