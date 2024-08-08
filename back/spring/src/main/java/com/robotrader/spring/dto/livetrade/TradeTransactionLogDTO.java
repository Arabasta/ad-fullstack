package com.robotrader.spring.dto.livetrade;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
public class TradeTransactionLogDTO {
    private String transactionId;
    private String ticker;
    private String action;
    private LocalDateTime transactionDateTime;
    private BigDecimal transactionQuantity;
    private BigDecimal transactionPrice;
    private BigDecimal transactionAmount;
    private PortfolioTypeEnum portfolioType;
}
