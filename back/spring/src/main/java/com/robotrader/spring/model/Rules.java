package com.robotrader.spring.model;

import com.robotrader.spring.model.enums.RecurringFrequencyEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
public class Rules {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @DecimalMin(value = "0.0", message = "Stop loss percentage must be greater than or equal to 0")
    private Double stopLoss;

    @DecimalMin(value = "0.0", message = "Stop loss trigger must be greater than or equal to 0")
    private Double stopLossTrigger;

    @DecimalMin(value = "0.0", message = "Recurring allocation must be greater than or equal to 0")
    @Digits(integer = 10, fraction = 2, message = "Recurring allocation must have at most 2 decimal places")
    @Column(precision = 10, scale = 2)
    private BigDecimal recurringAllocation;

    @DecimalMin(value = "0.0", message = "Recurring allocation trigger must be greater than or equal to 0")
    private Double recurringAllocationTrigger;

    @Enumerated(EnumType.STRING)
    private RecurringFrequencyEnum recurringAllocationFrequency;

    @NotNull(message = "Recurring allocation day cannot be null")
    @Min(value = 1, message = "Recurring allocation day must be at least 1")
    @Max(value = 28, message = "Recurring allocation day cannot exceed 28")
    private Integer recurringAllocationDay;

    public Rules() {}
}