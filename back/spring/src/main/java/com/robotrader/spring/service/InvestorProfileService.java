package com.robotrader.spring.service;

import com.robotrader.spring.model.InvestorProfile;
import com.robotrader.spring.repository.InvestorProfileRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class InvestorProfileService {

    private final InvestorProfileRepository investorProfileRepository;

    public InvestorProfileService(InvestorProfileRepository investorProfileRepository) {
        this.investorProfileRepository = investorProfileRepository;
    }

    public void save(InvestorProfile investorProfile) {
        investorProfileRepository.save(investorProfile);
    }

    @Transactional
    public InvestorProfile initBaseInvestorProfile() {
        InvestorProfile investorProfile = new InvestorProfile();
        save(investorProfile);
        return investorProfile;
    }
}
