package com.robotrader.spring.service;

import com.robotrader.spring.dto.financialProfile.FinancialProfileDTO;
import com.robotrader.spring.exception.notFound.FinancialProfileNotFoundException;
import com.robotrader.spring.model.FinancialProfile;
import com.robotrader.spring.repository.FinancialProfileRepository;
import com.robotrader.spring.service.interfaces.ICustomerService;
import com.robotrader.spring.service.interfaces.IFinancialProfileService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class FinancialProfileService implements IFinancialProfileService {

    private final FinancialProfileRepository financialProfileRepository;
    private final ICustomerService customerService;

    @Autowired
    public FinancialProfileService(FinancialProfileRepository financialProfileRepository, @Lazy CustomerService customerService) {
        this.financialProfileRepository = financialProfileRepository;
        this.customerService = customerService;
    }

    @Override
    @Transactional
    public void save(FinancialProfile financialProfile) {
        financialProfileRepository.save(financialProfile);
    }

    @Override
    @Transactional
    public FinancialProfile create(FinancialProfileDTO financialProfileDTO) {
        FinancialProfile financialProfile = new FinancialProfile();
        financialProfile.setEmploymentStatus(financialProfileDTO.getEmploymentStatus());
        financialProfile.setAnnualIncome(financialProfileDTO.getAnnualIncome());
        financialProfile.setNetWorth(financialProfileDTO.getNetWorth());
        financialProfile.setSourceOfWealth(financialProfileDTO.getSourceOfWealth());
        financialProfile.setInvestmentObjective(financialProfileDTO.getInvestmentObjective());
        financialProfile.setInvestmentExperience(financialProfileDTO.getInvestmentExperience());
        save(financialProfile);
        return financialProfile;
    }

    @Override
    public FinancialProfile getFinancialProfileByUsername(String username) {
        FinancialProfile financialProfile = customerService.getCustomerByUsername(username).getFinancialProfile();
        if (financialProfile == null)
            throw new FinancialProfileNotFoundException("Financial profile not found");
        return financialProfile;
    }

    @Override
    public FinancialProfileDTO getFinancialProfileDTOByUsername(String username) {
        FinancialProfile financialProfile = getFinancialProfileByUsername(username);
        return new FinancialProfileDTO(financialProfile.getEmploymentStatus(), financialProfile.getAnnualIncome(),
                financialProfile.getNetWorth(), financialProfile.getSourceOfWealth(),
                financialProfile.getInvestmentObjective(), financialProfile.getInvestmentExperience());
    }

    @Override
    @Transactional
    public FinancialProfileDTO update(String username, FinancialProfileDTO financialProfileDTO) {
        FinancialProfile financialProfile = getFinancialProfileByUsername(username);
        financialProfile.setEmploymentStatus(financialProfileDTO.getEmploymentStatus());
        financialProfile.setAnnualIncome(financialProfileDTO.getAnnualIncome());
        financialProfile.setNetWorth(financialProfileDTO.getNetWorth());
        financialProfile.setSourceOfWealth(financialProfileDTO.getSourceOfWealth());
        financialProfile.setInvestmentObjective(financialProfileDTO.getInvestmentObjective());
        financialProfile.setInvestmentExperience(financialProfileDTO.getInvestmentExperience());
        save(financialProfile);
        return financialProfileDTO;
    }
}
