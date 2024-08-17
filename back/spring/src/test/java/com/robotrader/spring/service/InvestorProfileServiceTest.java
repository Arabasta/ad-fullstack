package com.robotrader.spring.service;

import com.robotrader.spring.dto.investorProfile.InvestorProfileUpdateDTO;
import com.robotrader.spring.exception.notFound.InvestorProfileNotFoundException;
import com.robotrader.spring.model.Customer;
import com.robotrader.spring.model.InvestorProfile;
import com.robotrader.spring.repository.InvestorProfileRepository;
import com.robotrader.spring.service.interfaces.ICustomerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class InvestorProfileServiceTest {

    @Mock
    private InvestorProfileRepository investorProfileRepository;

    @Mock
    private ICustomerService customerService;

    @InjectMocks
    private InvestorProfileService investorProfileService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateInvestorProfile_Success() {
        InvestorProfileUpdateDTO investorProfileDTO = new InvestorProfileUpdateDTO();
        investorProfileDTO.setInvestmentDurationScore(3);
        investorProfileDTO.setWithdrawalSpendingPlanScore(2);
        investorProfileDTO.setInvestmentKnowledgeScore(4);
        investorProfileDTO.setRiskRewardScore(3);
        investorProfileDTO.setOwnedInvestmentsScore(2);
        investorProfileDTO.setInvestmentPersonalityScore(4);

        InvestorProfile investorProfile = investorProfileService.create(investorProfileDTO);

        assertNotNull(investorProfile);
        assertEquals(3, investorProfile.getInvestmentDurationScore());
        assertEquals(2, investorProfile.getWithdrawalSpendingPlanScore());
        assertEquals(4, investorProfile.getInvestmentKnowledgeScore());
        assertEquals(3, investorProfile.getRiskRewardScore());
        assertEquals(2, investorProfile.getOwnedInvestmentsScore());
        assertEquals(4, investorProfile.getInvestmentPersonalityScore());
        assertNotNull(investorProfile.getCalculatedTimeHorizonScore());
        assertNotNull(investorProfile.getCalculatedRiskToleranceScore());
        verify(investorProfileRepository).save(investorProfile);
    }

    @Test
    void testGetInvestorProfileByUsername_Success() {
        InvestorProfile investorProfile = new InvestorProfile();
        investorProfile.setInvestmentDurationScore(3);

        Customer customer = new Customer();
        customer.setInvestorProfile(investorProfile);

        when(customerService.getCustomerByUsername("user")).thenReturn(customer);

        InvestorProfile result = investorProfileService.getInvestorProfileByUsername("user");

        assertNotNull(result);
        assertEquals(3, result.getInvestmentDurationScore());
    }

    @Test
    void testGetInvestorProfileByUsername_NotFound() {
        Customer customer = new Customer();
        customer.setInvestorProfile(null);

        when(customerService.getCustomerByUsername("user")).thenReturn(customer);

        assertThrows(InvestorProfileNotFoundException.class, () -> {
            investorProfileService.getInvestorProfileByUsername("user");
        });
    }

}
