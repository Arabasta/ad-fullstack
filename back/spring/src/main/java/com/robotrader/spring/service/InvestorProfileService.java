package com.robotrader.spring.service;

import com.robotrader.spring.exception.notFound.InvestorProfileNotFoundException;
import com.robotrader.spring.model.InvestorProfile;
import com.robotrader.spring.repository.InvestorProfileRepository;
import com.robotrader.spring.service.interfaces.ICustomerService;
import com.robotrader.spring.service.interfaces.IInvestorProfileService;
import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class InvestorProfileService implements IInvestorProfileService {

    private final InvestorProfileRepository investorProfileRepository;
    private final ICustomerService customerService;

    public InvestorProfileService(InvestorProfileRepository investorProfileRepository, @Lazy CustomerService customerService) {
        this.investorProfileRepository = investorProfileRepository;
        this.customerService = customerService;
    }

    @Override
    @Transactional
    public void save(InvestorProfile investorProfile) {
        investorProfileRepository.save(investorProfile);
    }

    @Override
    @Transactional
    public InvestorProfile initBaseInvestorProfile() {
        InvestorProfile investorProfile = new InvestorProfile();
        save(investorProfile);
        return investorProfile;
    }

    @Override
    public InvestorProfile getInvestorProfileByUsername(String username) {
        InvestorProfile investorProfile = customerService.getCustomerByUsername(username).getInvestorProfile();
        if (investorProfile == null) {
            throw new InvestorProfileNotFoundException("Investor profile not found");
        }
        return investorProfile;
    }

}
