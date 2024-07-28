package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.financialProfile.FinancialProfileDTO;
import com.robotrader.spring.model.FinancialProfile;

public interface IFinancialProfileService {
    void save(FinancialProfile financialProfile);
    FinancialProfile create(FinancialProfileDTO financialProfileDTO);
    FinancialProfile getFinancialProfileByUsername(String username);
    FinancialProfileDTO getFinancialProfileDTOByUsername(String username);
    FinancialProfileDTO update(String username, FinancialProfileDTO financialProfileDTO);
}
