package com.robotrader.spring.dto.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FinancialProfileCreateDTO {
    @NotBlank
    @Size(min = 1, max = 50, message = "Employment status cannot be more than 50 characters")
    private String employmentStatus;

    private Double annualIncome;

    private Double netWorth;

    @NotBlank
    @Size(min = 1, max = 50, message = "Source of wealth cannot be more than 50 characters")
    private String sourceOfWealth;

    @NotBlank
    @Size(min = 1, max = 50, message = "Investment objective cannot be more than 50 characters")
    private String investmentObjective;

    @NotBlank
    @Size(min = 1, max = 50, message = "Investment experience cannot be more than 50 characters")
    private String investmentExperience;
}
