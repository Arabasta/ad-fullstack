package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.model.InvestorProfile;

public interface IInvestorProfileService {
    void save(InvestorProfile investorProfile);
    InvestorProfile initBaseInvestorProfile();
    InvestorProfile getInvestorProfileByUsername(String username);
}
