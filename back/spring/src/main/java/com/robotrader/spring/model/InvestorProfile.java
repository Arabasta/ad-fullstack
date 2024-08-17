package com.robotrader.spring.model;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class InvestorProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Question 1
    @Min(value = 1, message = "Please input a value between 1 and 4")
    @Max(value = 4, message = "Please input a value between 1 and 4")
    @NotNull
    private Integer investmentDurationScore = 0;

    // Question 2
    @Min(value = 1, message = "Please input a value between 1 and 4")
    @Max(value = 4, message = "Please input a value between 1 and 4")
    @NotNull
    private Integer withdrawalSpendingPlanScore = 0;

    // Question 3
    @Min(value = 1, message = "Please input a value between 1 and 4")
    @Max(value = 4, message = "Please input a value between 1 and 4")
    @NotNull
    private Integer investmentKnowledgeScore = 0;

    // Question 4
    @Min(value = 1, message = "Please input a value between 1 and 3")
    @Max(value = 3, message = "Please input a value between 1 and 3")
    @NotNull
    private Integer riskRewardScore = 0;

    // Question 5
    @Min(value = 1, message = "Please input a value between 1 and 3")
    @Max(value = 3, message = "Please input a value between 1 and 3")
    @NotNull
    private Integer ownedInvestmentsScore = 0;

    // Question 6
    @Min(value = 1, message = "Please input a value between 1 and 4")
    @Max(value = 4, message = "Please input a value between 1 and 4")
    @NotNull
    private Integer investmentPersonalityScore = 0;

    // derived field
    private Integer calculatedTimeHorizonScore = 0;

    // derived field
    private Integer calculatedRiskToleranceScore = 0;

    // derived field
    @Setter
    private PortfolioTypeEnum recommendedPortfolioType;

    public void setInvestmentDurationScore(Integer investmentDurationScore) {
        this.calculatedTimeHorizonScore -= this.investmentDurationScore;
        this.calculatedTimeHorizonScore += investmentDurationScore;
        this.investmentDurationScore = investmentDurationScore;
    }

    public void setWithdrawalSpendingPlanScore(Integer expenditureScore) {
        this.calculatedTimeHorizonScore -= this.withdrawalSpendingPlanScore;
        this.calculatedTimeHorizonScore += expenditureScore;
        this.withdrawalSpendingPlanScore = expenditureScore;
    }

    public void setInvestmentKnowledgeScore(Integer knowledgeScore) {
        this.calculatedRiskToleranceScore -= this.investmentKnowledgeScore;
        this.calculatedRiskToleranceScore += knowledgeScore;
        this.investmentKnowledgeScore = knowledgeScore;
    }

    public void setRiskRewardScore(Integer riskScore) {
        this.calculatedRiskToleranceScore -= this.riskRewardScore;
        this.calculatedRiskToleranceScore += riskScore;
        this.riskRewardScore = riskScore;
    }

    public void setOwnedInvestmentsScore(Integer experienceScore) {
        this.calculatedRiskToleranceScore -= this.ownedInvestmentsScore;
        this.calculatedRiskToleranceScore += experienceScore;
        this.ownedInvestmentsScore = experienceScore;
    }

    public void setInvestmentPersonalityScore(Integer scenarioScore) {
        this.calculatedRiskToleranceScore -= this.investmentPersonalityScore;
        this.calculatedRiskToleranceScore += scenarioScore;
        this.investmentPersonalityScore = scenarioScore;
    }
}
