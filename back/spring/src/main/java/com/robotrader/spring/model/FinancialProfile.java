package com.robotrader.spring.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@Entity
public class FinancialProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // todo: change to enum
    @NotNull(message = "Amount cannot be null")
    @Column(nullable = false, length = 50)
    private String employmentStatus;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal annualIncome;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal netWorth;

    // todo: change to enum
    @Column(nullable = false, length = 50)
    private String sourceOfWealth;

    // todo: change to enum
    @Column(nullable = false, length = 50)
    private String investmentObjective;

    // todo: change to enum
    @Column(nullable = false, length = 50)
    private String investmentExperience;

    public FinancialProfile() {
        this.employmentStatus = "nil";
        this.annualIncome = new BigDecimal(0);
        this.netWorth = new BigDecimal(0);
        this.sourceOfWealth = "nil";
        this.investmentObjective = "nil";
        this.investmentExperience = "nil";
    }
}
