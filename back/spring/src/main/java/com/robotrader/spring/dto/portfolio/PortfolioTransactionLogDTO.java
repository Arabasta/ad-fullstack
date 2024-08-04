package com.robotrader.spring.dto.portfolio;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
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
public class PortfolioTransactionLogDTO {
    private Long id;
    private LocalDateTime timestamp;
    private PortfolioTypeEnum portfolioType;
    private String transactionType;
    private BigDecimal transactionAmount;
    private BigDecimal totalAmount;
}
