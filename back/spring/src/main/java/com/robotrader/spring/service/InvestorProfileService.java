package com.robotrader.spring.service;

import com.robotrader.spring.dto.investorProfile.InvestorProfileDTO;
import com.robotrader.spring.dto.investorProfile.InvestorProfileUpdateDTO;
import com.robotrader.spring.exception.notFound.InvestorProfileNotFoundException;
import com.robotrader.spring.model.InvestorProfile;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
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

    public InvestorProfileService(InvestorProfileRepository investorProfileRepository, @Lazy ICustomerService customerService) {
        this.investorProfileRepository = investorProfileRepository;
        this.customerService = customerService;
    }

    @Override
    @Transactional
    public void save(InvestorProfile investorProfile) {
        investorProfileRepository.save(investorProfile);
    }


    @Override
    public InvestorProfile getInvestorProfileByUsername(String username) {
        InvestorProfile investorProfile = customerService.getCustomerByUsername(username).getInvestorProfile();
        if (investorProfile == null) {
            throw new InvestorProfileNotFoundException("Investor profile not found");
        }
        return investorProfile;
    }

    @Override
    public InvestorProfileDTO getInvestorProfileDTOByUsername(String username) {
        InvestorProfile investorProfile = getInvestorProfileByUsername(username);
        return getInvestorProfileDTOByInvestorProfile(investorProfile);
    }

    @Override
    public InvestorProfileDTO getInvestorProfileDTOByInvestorProfile(InvestorProfile investorProfile) {
        return new InvestorProfileDTO(investorProfile.getInvestmentDurationScore(),
                investorProfile.getWithdrawalSpendingPlanScore(),
                investorProfile.getInvestmentKnowledgeScore(),
                investorProfile.getRiskRewardScore(),
                investorProfile.getOwnedInvestmentsScore(),
                investorProfile.getInvestmentPersonalityScore(),
                investorProfile.getCalculatedTimeHorizonScore(),
                investorProfile.getCalculatedRiskToleranceScore(),
                investorProfile.getRecommendedPortfolioType()
        );
    }

    @Override
    public PortfolioTypeEnum calculateRecommendedPortfolioType(InvestorProfile portfolio) {
        if (portfolio.getCalculatedTimeHorizonScore() < 3) {
            return PortfolioTypeEnum.CONSERVATIVE;
        }
        else if (portfolio.getCalculatedTimeHorizonScore() >= 6) {
            return portfolio.getCalculatedRiskToleranceScore() < 10 ?
                    PortfolioTypeEnum.MODERATE : PortfolioTypeEnum.AGGRESSIVE;
        }
        else {
            if (portfolio.getCalculatedRiskToleranceScore() < 6) {
                return PortfolioTypeEnum.CONSERVATIVE;
            } else if (portfolio.getCalculatedRiskToleranceScore() < 14) {
                return PortfolioTypeEnum.MODERATE;
            } else {
                return PortfolioTypeEnum.AGGRESSIVE;
            }
        }
    }

    @Override
    @Transactional
    public InvestorProfile create(InvestorProfileUpdateDTO investorProfileDTO) {
        InvestorProfile investorProfile = new InvestorProfile();
        updateInvestorProfileFromDTO(investorProfile, investorProfileDTO);
        save(investorProfile);
        return investorProfile;
    }

    @Override
    @Transactional
    public InvestorProfileDTO update(String username, InvestorProfileUpdateDTO investorProfileDTO) {
        InvestorProfile investorProfile = getInvestorProfileByUsername(username);
        updateInvestorProfileFromDTO(investorProfile, investorProfileDTO);
        save(investorProfile);
        return getInvestorProfileDTOByInvestorProfile(investorProfile);
    }

    @Override
    public void updateInvestorProfileFromDTO(InvestorProfile investorProfile, InvestorProfileUpdateDTO investorProfileDTO) {
        investorProfile.setInvestmentDurationScore(investorProfileDTO.getInvestmentDurationScore());
        investorProfile.setWithdrawalSpendingPlanScore(investorProfileDTO.getWithdrawalSpendingPlanScore());
        investorProfile.setInvestmentKnowledgeScore(investorProfileDTO.getInvestmentKnowledgeScore());
        investorProfile.setRiskRewardScore(investorProfileDTO.getRiskRewardScore());
        investorProfile.setOwnedInvestmentsScore(investorProfileDTO.getOwnedInvestmentsScore());
        investorProfile.setInvestmentPersonalityScore(investorProfileDTO.getInvestmentPersonalityScore());
        investorProfile.setRecommendedPortfolioType(calculateRecommendedPortfolioType(investorProfile));
    }
}
