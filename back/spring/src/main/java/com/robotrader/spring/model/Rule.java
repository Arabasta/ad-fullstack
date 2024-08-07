package com.robotrader.spring.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Rule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @DecimalMin(value = "0.0", message = "Recurring allocation must be greater than or equal to 0")
    @DecimalMax(value = "1000000000.00", message = "Amount must be less than or equal to 1000000000.00")
    @Digits(integer = 10, fraction = 2, message = "Recurring allocation must have at most 2 decimal places")
    @Column(precision = 12, scale = 2)
    private BigDecimal stopLossInitialValue;

    @DecimalMin(value = "0.0", message = "Stop loss percentage must be greater than or equal to 0")
    @DecimalMax(value = "100.0", message = "Stop loss percentage must be less than or equal to 100")
    private Double stopLossPercentage;

    @DecimalMin(value = "0.0", message = "Recurring allocation must be greater than or equal to 0")
    @DecimalMax(value = "1000000000.00", message = "Amount must be less than or equal to 1000000000.00")
    @Digits(integer = 10, fraction = 2, message = "Recurring allocation must have at most 2 decimal places")
    @Column(precision = 12, scale = 2)
    private BigDecimal recurringAllocationAmount;

    @Min(value = 1, message = "Recurring allocation day must be at least 1")
    @Max(value = 28, message = "Recurring allocation day cannot exceed 28")
    private Integer recurringAllocationDay;
}