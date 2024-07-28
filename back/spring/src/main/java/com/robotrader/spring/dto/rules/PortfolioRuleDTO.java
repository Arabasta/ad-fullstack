package com.robotrader.spring.dto.rules;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class PortfolioRuleDTO {

    @Enumerated(EnumType.STRING)
    private PortfolioTypeEnum portfolioType;

    @DecimalMin(value = "0.0", message = "Recurring allocation must be greater than or equal to 0")
    @DecimalMax(value = "1000000000.00", message = "Amount must be less than or equal to 1000000000.00")
    @Digits(integer = 10, fraction = 2, message = "Recurring allocation must have at most 2 decimal places")
    private BigDecimal stopLossInitialValue;

    @DecimalMin(value = "0.0", message = "Stop loss percentage must be greater than or equal to 0")
    @DecimalMax(value = "100.0", message = "Stop loss percentage must be less than or equal to 100")
    private Double stopLoss;

    @DecimalMin(value = "0.0", message = "Recurring allocation must be greater than or equal to 0")
    @DecimalMax(value = "1000000000.00", message = "Amount must be less than or equal to 1000000000.00")
    @Digits(integer = 10, fraction = 2, message = "Recurring allocation must have at most 2 decimal places")
    private BigDecimal recurringAllocationAmount;

    @Min(value = 1, message = "Recurring allocation day must be at least 1")
    @Max(value = 28, message = "Recurring allocation day cannot exceed 28")
    private Integer recurringAllocationDay;
}
