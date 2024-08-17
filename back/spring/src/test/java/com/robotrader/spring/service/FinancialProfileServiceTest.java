package com.robotrader.spring.service;

import com.robotrader.spring.dto.financialProfile.FinancialProfileDTO;
import com.robotrader.spring.exception.notFound.FinancialProfileNotFoundException;
import com.robotrader.spring.model.Customer;
import com.robotrader.spring.model.FinancialProfile;
import com.robotrader.spring.model.enums.EmploymentStatusEnum;
import com.robotrader.spring.model.enums.InvestmentExperienceEnum;
import com.robotrader.spring.model.enums.InvestmentObjectiveEnum;
import com.robotrader.spring.model.enums.SourceOfWealthEnum;
import com.robotrader.spring.repository.FinancialProfileRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class FinancialProfileServiceTest {

    @Mock
    private FinancialProfileRepository financialProfileRepository;

    @Mock
    private CustomerService customerService;

    private FinancialProfileService financialProfileService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        financialProfileService = new FinancialProfileService(financialProfileRepository, customerService);
    }

    @Test
    void testCreateFinancialProfile_Success() {
        FinancialProfileDTO financialProfileDTO = new FinancialProfileDTO();
        financialProfileDTO.setEmploymentStatus(EmploymentStatusEnum.EMPLOYED);
        financialProfileDTO.setAnnualIncome(BigDecimal.valueOf(100000));
        financialProfileDTO.setNetWorth(BigDecimal.valueOf(500000));
        financialProfileDTO.setSourceOfWealth(SourceOfWealthEnum.BUSINESS);
        financialProfileDTO.setInvestmentObjective(InvestmentObjectiveEnum.GROWTH);
        financialProfileDTO.setInvestmentExperience(InvestmentExperienceEnum.LIMITED);

        FinancialProfile financialProfile = financialProfileService.create(financialProfileDTO);

        assertNotNull(financialProfile);
        assertEquals(EmploymentStatusEnum.EMPLOYED, financialProfile.getEmploymentStatus());
        assertEquals(BigDecimal.valueOf(100000), financialProfile.getAnnualIncome());
        assertEquals(BigDecimal.valueOf(500000), financialProfile.getNetWorth());
        assertEquals(SourceOfWealthEnum.BUSINESS, financialProfile.getSourceOfWealth());
        assertEquals(InvestmentObjectiveEnum.GROWTH, financialProfile.getInvestmentObjective());
        assertEquals(InvestmentExperienceEnum.LIMITED, financialProfile.getInvestmentExperience());

        verify(financialProfileRepository).save(financialProfile);
    }

    @Test
    void testGetFinancialProfileByUsername_Success() {
        FinancialProfile financialProfile = new FinancialProfile();
        financialProfile.setEmploymentStatus(EmploymentStatusEnum.EMPLOYED);

        Customer customer = new Customer();
        customer.setFinancialProfile(financialProfile);

        when(customerService.getCustomerByUsername("user")).thenReturn(customer);

        FinancialProfile result = financialProfileService.getFinancialProfileByUsername("user");

        assertNotNull(result);
        assertEquals(EmploymentStatusEnum.EMPLOYED, result.getEmploymentStatus());
    }

    @Test
    void testGetFinancialProfileByUsername_NotFound() {
        when(customerService.getCustomerByUsername("user")).thenReturn(new Customer());

        assertThrows(FinancialProfileNotFoundException.class, () -> {
            financialProfileService.getFinancialProfileByUsername("user");
        });
    }

    @Test
    void testUpdateFinancialProfile_Success() {
        FinancialProfile existingProfile = new FinancialProfile();
        existingProfile.setEmploymentStatus(EmploymentStatusEnum.UNEMPLOYED);

        Customer customer = new Customer();
        customer.setFinancialProfile(existingProfile);

        FinancialProfileDTO financialProfileDTO = new FinancialProfileDTO();
        financialProfileDTO.setEmploymentStatus(EmploymentStatusEnum.EMPLOYED);
        financialProfileDTO.setAnnualIncome(BigDecimal.valueOf(150000));
        financialProfileDTO.setNetWorth(BigDecimal.valueOf(600000));

        when(customerService.getCustomerByUsername("user")).thenReturn(customer);

        FinancialProfileDTO updatedProfileDTO = financialProfileService.update("user", financialProfileDTO);

        assertNotNull(updatedProfileDTO);
        assertEquals(EmploymentStatusEnum.EMPLOYED, existingProfile.getEmploymentStatus());
        assertEquals(BigDecimal.valueOf(150000), existingProfile.getAnnualIncome());
        assertEquals(BigDecimal.valueOf(600000), existingProfile.getNetWorth());

        verify(financialProfileRepository).save(existingProfile);
    }
}
