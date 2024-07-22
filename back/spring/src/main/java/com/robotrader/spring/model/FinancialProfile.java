package com.robotrader.spring.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "financial_profile")
public class FinancialProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Amount cannot be null")
    @Column(nullable = false, length = 50)
    private String employmentStatus;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal annualIncome;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal netWorth;

    @Column(nullable = false, length = 50)
    private String sourceOfWealth;

    @Column(nullable = false, length = 50)
    private String investmentObjective;

    @Column(nullable = false, length = 50)
    private String investmentExperience;

    public FinancialProfile() {}

    public FinancialProfile(String employmentStatus, BigDecimal annualIncome, BigDecimal netWorth,
                            String sourceOfWealth, String investmentObjective, String investmentExperience) {
        this.employmentStatus = employmentStatus;
        this.annualIncome = annualIncome;
        this.netWorth = netWorth;
        this.sourceOfWealth = sourceOfWealth;
        this.investmentObjective = investmentObjective;
        this.investmentExperience = investmentExperience;
    }
}
