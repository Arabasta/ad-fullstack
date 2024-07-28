package com.robotrader.spring.trading.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@Data
public class TradeTransaction {
    private String transactionId;
    private String ticker;
    private String action;
    private ZonedDateTime transactionDateTime;
    private BigDecimal transactionQuantity;
    private BigDecimal transactionPrice;

    public TradeTransaction() {}

    public TradeTransaction(String ticker, ZonedDateTime transactionDateTime, BigDecimal transactionQuantity, BigDecimal transactionPrice, String action) {
        this.transactionId = UUID.randomUUID().toString();
        this.ticker = ticker;
        this.action = action;
        this.transactionDateTime = transactionDateTime;
        this.transactionQuantity = transactionQuantity;
        this.transactionPrice = transactionPrice;
    }

    @Override
    public String toString() {
        return "TradeTransaction{" +
                "transactionId='" + transactionId + '\'' +
                ", ticker='" + ticker + '\'' +
                ", action='" + action + '\'' +
                ", transactionDateTime=" + transactionDateTime +
                ", transactionQuantity=" + transactionQuantity +
                ", transactionPrice=" + transactionPrice +
                ", transactionAmount=" + transactionPrice.multiply(transactionQuantity) +
                '}';
    }
}
