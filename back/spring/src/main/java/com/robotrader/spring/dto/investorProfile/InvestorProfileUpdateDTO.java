package com.robotrader.spring.dto.investorProfile;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvestorProfileUpdateDTO {
    // Question 1
    @Min(value = 1, message = "Please input a value between 1 and 4")
    @Max(value = 4, message = "Please input a value between 1 and 4")
    @NotNull
    private Integer investmentDurationScore;

    // Question 2
    @Min(value = 1, message = "Please input a value between 1 and 4")
    @Max(value = 4, message = "Please input a value between 1 and 4")
    @NotNull
    private Integer withdrawalSpendingPlanScore;

    // Question 3
    @Min(value = 1, message = "Please input a value between 1 and 4")
    @Max(value = 4, message = "Please input a value between 1 and 4")
    @NotNull
    private Integer investmentKnowledgeScore;

    // Question 4
    @Min(value = 1, message = "Please input a value between 1 and 3")
    @Max(value = 3, message = "Please input a value between 1 and 3")
    @NotNull
    private Integer riskRewardScore;

    // Question 5
    @Min(value = 1, message = "Please input a value between 1 and 3")
    @Max(value = 3, message = "Please input a value between 1 and 3")
    @NotNull
    private Integer ownedInvestmentsScore;

    // Question 6
    @Min(value = 1, message = "Please input a value between 1 and 4")
    @Max(value = 4, message = "Please input a value between 1 and 4")
    @NotNull
    private Integer investmentPersonalityScore;
}
