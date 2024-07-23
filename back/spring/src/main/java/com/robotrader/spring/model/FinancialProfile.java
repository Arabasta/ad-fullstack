package com.robotrader.spring.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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

}
