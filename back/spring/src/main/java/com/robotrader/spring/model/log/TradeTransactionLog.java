package com.robotrader.spring.model.log;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
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

    @NotNull(message = "Ticker cannot be null")
    @Column(nullable = false)
    private String ticker;

    @NotNull(message = "Action cannot be null")
    @Column(nullable = false)
    private String action;

    @NotNull(message = "Timestamp cannot be null")
    private LocalDateTime transactionDateTime;

    @NotNull(message = "Transaction quantity cannot be null")
    @DecimalMin(value = "0", message = "Amount must be greater than or equal to 0")
    @Column(nullable = false, precision = 14, scale = 2)
    private BigDecimal transactionQuantity;

    @NotNull(message = "Transaction price cannot be null")
    @DecimalMin(value = "0", message = "Amount must be greater than or equal to 0")
    @Column(nullable = false, precision = 16, scale = 4)
    private BigDecimal transactionPrice;

    @NotNull(message = "Transaction amount cannot be null")
    @DecimalMin(value = "0", message = "Amount must be greater than or equal to 0")
    @Column(nullable = false, precision = 16, scale = 4)
    private BigDecimal transactionAmount;

    @Enumerated(EnumType.STRING)
    private PortfolioTypeEnum portfolioType;
}
