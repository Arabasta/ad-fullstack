package com.robotrader.spring.service;

import com.robotrader.spring.model.FinancialProfile;
import com.robotrader.spring.repository.FinancialProfileRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FinancialProfileService {

    private final FinancialProfileRepository financialProfileRepository;

    @Autowired
    public FinancialProfileService(FinancialProfileRepository financialProfileRepository) {
        this.financialProfileRepository = financialProfileRepository;
    }

    public void save(FinancialProfile financialProfile) {
        financialProfileRepository.save(financialProfile);
    }

    @Transactional
    public FinancialProfile initBaseFinancialProfile() {
        FinancialProfile financialProfile = new FinancialProfile();
        save(financialProfile);
        return financialProfile;
    }

}
