package com.robotrader.spring.model;

import com.robotrader.spring.model.enums.InvestmentExperienceEnum;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class InvestorProfileTest {
    @Test
    public void testSetInvestmentDurationScore() {
        InvestorProfile investorProfile = new InvestorProfile();
        investorProfile.setInvestmentDurationScore(3);
        assertEquals(3, investorProfile.getInvestmentDurationScore());
        assertEquals(3, investorProfile.getCalculatedTimeHorizonScore());
    }

    @Test
    public void testSetWithdrawalSpendingPlanScore() {
        InvestorProfile investorProfile = new InvestorProfile();
        investorProfile.setWithdrawalSpendingPlanScore(2);
        assertEquals(2, investorProfile.getWithdrawalSpendingPlanScore());
        assertEquals(2, investorProfile.getCalculatedTimeHorizonScore());
    }

    @Test
    public void testSetInvestmentKnowledgeScore() {
        InvestorProfile investorProfile = new InvestorProfile();
        investorProfile.setInvestmentKnowledgeScore(4);
        assertEquals(4, investorProfile.getInvestmentKnowledgeScore());
        assertEquals(4, investorProfile.getCalculatedRiskToleranceScore());
    }

    @Test
    public void testSetRiskRewardScore() {
        InvestorProfile investorProfile = new InvestorProfile();
        investorProfile.setRiskRewardScore(2);
        assertEquals(2, investorProfile.getRiskRewardScore());
        assertEquals(2, investorProfile.getCalculatedRiskToleranceScore());
    }

    @Test
    public void testSetOwnedInvestmentsScore() {
        InvestorProfile investorProfile = new InvestorProfile();
        investorProfile.setOwnedInvestmentsScore(1);
        assertEquals(1, investorProfile.getOwnedInvestmentsScore());
        assertEquals(1, investorProfile.getCalculatedRiskToleranceScore());
    }

    @Test
    public void testSetInvestmentPersonalityScore() {
        InvestorProfile investorProfile = new InvestorProfile();
        investorProfile.setInvestmentPersonalityScore(3);
        assertEquals(3, investorProfile.getInvestmentPersonalityScore());
        assertEquals(3, investorProfile.getCalculatedRiskToleranceScore());
    }

    @ParameterizedTest
    @EnumSource(PortfolioTypeEnum.class)
    public void testRecommendedPortfolioType(PortfolioTypeEnum type) {
        InvestorProfile investorProfile = new InvestorProfile();
        investorProfile.setRecommendedPortfolioType(type);
        assertEquals(type, investorProfile.getRecommendedPortfolioType());
    }
}
