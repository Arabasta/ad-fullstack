package com.robotrader.spring.dto.wallet;

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
public class WalletTransactionLogDTO {
    private Long id;
    private LocalDateTime timestamp;
    private String transactionType;
    private BigDecimal transactionAmount;
    private BigDecimal totalAmount;
}
