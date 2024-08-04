package com.robotrader.spring.trading.dto;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class TradeTransaction {
    private String transactionId;
    private String ticker;
    private String action;
    private LocalDateTime transactionDateTime;
    private BigDecimal transactionQuantity;
    private BigDecimal transactionPrice;
    private PortfolioTypeEnum portfolioType;

    public TradeTransaction() {}

    public TradeTransaction(String ticker, LocalDateTime transactionDateTime, BigDecimal transactionQuantity,
                            BigDecimal transactionPrice, String action, PortfolioTypeEnum portfolioType) {
        this.transactionId = UUID.randomUUID().toString();
        this.ticker = ticker;
        this.action = action;
        this.transactionDateTime = transactionDateTime;
        this.transactionQuantity = transactionQuantity;
        this.transactionPrice = transactionPrice;
        this.portfolioType = portfolioType;
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
                ", portfolioType=" + portfolioType +
                '}';
    }
}
