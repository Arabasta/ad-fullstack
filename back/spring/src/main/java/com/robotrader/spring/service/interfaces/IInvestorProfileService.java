package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.investorProfile.InvestorProfileDTO;
import com.robotrader.spring.dto.investorProfile.InvestorProfileUpdateDTO;
import com.robotrader.spring.model.InvestorProfile;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;

public interface IInvestorProfileService {
    void save(InvestorProfile investorProfile);
    InvestorProfile create(InvestorProfileUpdateDTO investorProfileDTO);
    InvestorProfile getInvestorProfileByUsername(String username);
    InvestorProfileDTO getInvestorProfileDTOByUsername(String username);

    InvestorProfileDTO getInvestorProfileDTOByInvestorProfile(InvestorProfile investorProfile);

    PortfolioTypeEnum calculateRecommendedPortfolioType(InvestorProfile portfolio);
    InvestorProfileDTO update(String username, InvestorProfileUpdateDTO investorProfileDTO);
    void updateInvestorProfileFromDTO(InvestorProfile investorProfile, InvestorProfileUpdateDTO investorProfileDTO);
}
