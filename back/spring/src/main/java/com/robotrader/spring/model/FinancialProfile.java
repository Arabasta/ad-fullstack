package com.robotrader.spring.model;

import com.robotrader.spring.model.enums.EmploymentStatusEnum;
import com.robotrader.spring.model.enums.InvestmentExperienceEnum;
import com.robotrader.spring.model.enums.InvestmentObjectiveEnum;
import com.robotrader.spring.model.enums.SourceOfWealthEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
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
    private Long id;

    @Enumerated(EnumType.STRING)
    private EmploymentStatusEnum employmentStatus;

    @DecimalMin(value = "0", message = "Amount must be greater than or equal to 0")
    @DecimalMax(value = "1000000000.00", message = "Amount must be less than or equal to 1000000000.00")
    @Column(precision = 10, scale = 2)
    private BigDecimal annualIncome;

    @DecimalMin(value = "0", message = "Amount must be greater than or equal to 0")
    @DecimalMax(value = "1000000000.00", message = "Amount must be less than or equal to 1000000000.00")
    @Column(precision = 10, scale = 2)
    private BigDecimal netWorth;

    @Enumerated(EnumType.STRING)
    private SourceOfWealthEnum sourceOfWealth;

    @Enumerated(EnumType.STRING)
    private InvestmentObjectiveEnum investmentObjective;

    @Enumerated(EnumType.STRING)
    private InvestmentExperienceEnum investmentExperience;

}
