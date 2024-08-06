package com.robotrader.spring.model.log;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TradeTransactionLog {
    @Id
    private String transactionId;
    private String ticker;
    private String action;
    private LocalDateTime transactionDateTime;
    private BigDecimal transactionQuantity;
    private BigDecimal transactionPrice;
    @Enumerated(EnumType.STRING)
    private PortfolioTypeEnum portfolioType;
}
