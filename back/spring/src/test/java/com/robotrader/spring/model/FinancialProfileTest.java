package com.robotrader.spring.model;

import com.robotrader.spring.model.enums.EmploymentStatusEnum;
import com.robotrader.spring.model.enums.InvestmentExperienceEnum;
import com.robotrader.spring.model.enums.InvestmentObjectiveEnum;
import com.robotrader.spring.model.enums.SourceOfWealthEnum;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class FinancialProfileTest {
    @Test
    public void testGetId() {
        FinancialProfile financialProfile = new FinancialProfile();
        financialProfile.setId(1L);
        assertEquals(1L, financialProfile.getId());
    }

    @ParameterizedTest
    @EnumSource(EmploymentStatusEnum.class)
    public void testGetEmploymentStatus(EmploymentStatusEnum status) {
        FinancialProfile financialProfile = new FinancialProfile();
        financialProfile.setEmploymentStatus(status);
        assertEquals(status, financialProfile.getEmploymentStatus());
    }

    @ParameterizedTest
    @EnumSource(EmploymentStatusEnum.class)
    public void testSetEmploymentStatus(EmploymentStatusEnum status) {
        FinancialProfile financialProfile = new FinancialProfile();
        financialProfile.setEmploymentStatus(status);
        assertEquals(status, financialProfile.getEmploymentStatus());
    }

    @Test
    public void testAnnualIncomeSetterAndGetter() {
        FinancialProfile financialProfile = new FinancialProfile();
        BigDecimal expectedIncome = new BigDecimal("50000.00");
        financialProfile.setAnnualIncome(expectedIncome);
        assertEquals(expectedIncome, financialProfile.getAnnualIncome());
    }

    @Test
    public void testNetWorthSetterAndGetter() {
        FinancialProfile financialProfile = new FinancialProfile();
        BigDecimal expectedNetWorth = new BigDecimal("250000.00");
        financialProfile.setNetWorth(expectedNetWorth);
        assertEquals(expectedNetWorth, financialProfile.getNetWorth());
    }

    @ParameterizedTest
    @EnumSource(SourceOfWealthEnum.class)
    public void testGetSourceOfWealth(SourceOfWealthEnum wealth) {
        FinancialProfile financialProfile = new FinancialProfile();
        financialProfile.setSourceOfWealth(wealth);
        assertEquals(wealth, financialProfile.getSourceOfWealth());
    }

    @ParameterizedTest
    @EnumSource(SourceOfWealthEnum.class)
    public void testSetSourceOfWealth(SourceOfWealthEnum wealth) {
        FinancialProfile financialProfile = new FinancialProfile();
        financialProfile.setSourceOfWealth(wealth);
        assertEquals(wealth, financialProfile.getSourceOfWealth());
    }

    @ParameterizedTest
    @EnumSource(InvestmentObjectiveEnum.class)
    public void testGetInvestmentObjective(InvestmentObjectiveEnum objective) {
        FinancialProfile financialProfile = new FinancialProfile();
        financialProfile.setInvestmentObjective(objective);
        assertEquals(objective, financialProfile.getInvestmentObjective());
    }

    @ParameterizedTest
    @EnumSource(InvestmentObjectiveEnum.class)
    public void testSetInvestmentObjective(InvestmentObjectiveEnum objective) {
        FinancialProfile financialProfile = new FinancialProfile();
        financialProfile.setInvestmentObjective(objective);
        assertEquals(objective, financialProfile.getInvestmentObjective());
    }

    @ParameterizedTest
    @EnumSource(InvestmentExperienceEnum.class)
    public void testGetInvestmentExperience(InvestmentExperienceEnum experience) {
        FinancialProfile financialProfile = new FinancialProfile();
        financialProfile.setInvestmentExperience(experience);
        assertEquals(experience, financialProfile.getInvestmentExperience());
    }

    @ParameterizedTest
    @EnumSource(InvestmentExperienceEnum.class)
    public void testSetInvestmentExperience(InvestmentExperienceEnum experience) {
        FinancialProfile financialProfile = new FinancialProfile();
        financialProfile.setInvestmentExperience(experience);
        assertEquals(experience, financialProfile.getInvestmentExperience());
    }

    @Test
    public void testFinancialProfileConstructorWithParameters() {
        FinancialProfile financialProfile = new FinancialProfile(
                1L,
                EmploymentStatusEnum.EMPLOYED,
                new BigDecimal("50000.00"),
                new BigDecimal("250000.00"),
                SourceOfWealthEnum.SALARY,
                InvestmentObjectiveEnum.GROWTH,
                InvestmentExperienceEnum.NONE
        );

        assertNotNull(financialProfile);
        assertEquals(1L, financialProfile.getId());
        assertEquals(EmploymentStatusEnum.EMPLOYED, financialProfile.getEmploymentStatus());
        assertEquals(new BigDecimal("50000.00"), financialProfile.getAnnualIncome());
        assertEquals(new BigDecimal("250000.00"), financialProfile.getNetWorth());
        assertEquals(SourceOfWealthEnum.SALARY, financialProfile.getSourceOfWealth());
        assertEquals(InvestmentObjectiveEnum.GROWTH, financialProfile.getInvestmentObjective());
        assertEquals(InvestmentExperienceEnum.NONE, financialProfile.getInvestmentExperience());
    }

    @Test
    public void testFinancialProfileDefaultConstructor() {
        FinancialProfile financialProfile = new FinancialProfile();
        assertEquals(null, financialProfile.getEmploymentStatus());
        assertEquals(null, financialProfile.getAnnualIncome());
        assertEquals(null, financialProfile.getNetWorth());
        assertEquals(null, financialProfile.getSourceOfWealth());
        assertEquals(null, financialProfile.getInvestmentObjective());
        assertEquals(null, financialProfile.getInvestmentExperience());
    }
}
