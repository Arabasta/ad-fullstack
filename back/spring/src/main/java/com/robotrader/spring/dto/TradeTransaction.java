package com.robotrader.spring.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class TradeTransaction {
    private String transactionId;
    private String stockSymbol;
    private Long transactionTimestamp;
    private Integer transactionQuantity;
    private BigDecimal transactionPrice;
    private String action;

    public TradeTransaction() {}

    public TradeTransaction(String stockSymbol, Long transactionTimestamp, Integer transactionQuantity, BigDecimal transactionPrice, String action) {
        this.transactionId = UUID.randomUUID().toString();
        this.stockSymbol = stockSymbol;
        this.transactionTimestamp = transactionTimestamp;
        this.transactionQuantity = transactionQuantity;
        this.transactionPrice = transactionPrice;
        this.action = action;
    }
}
