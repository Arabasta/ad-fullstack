package com.robotrader.spring.service;

import com.robotrader.spring.dto.rules.PortfolioRuleDTO;
import com.robotrader.spring.dto.rules.ResetStopLossTriggerDTO;
import com.robotrader.spring.dto.rules.ResetStopLossTriggerResponseDTO;
import com.robotrader.spring.exception.notFound.RuleNotFoundException;
import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.Rule;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.repository.RulesRepository;
import com.robotrader.spring.service.interfaces.IPortfolioService;
import com.robotrader.spring.service.interfaces.IRuleService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class RuleService implements IRuleService {

    private final RulesRepository rulesRepository;
    private final IPortfolioService portfolioService;

    @Autowired
    public RuleService(RulesRepository rulesRepository, @Lazy IPortfolioService portfolioService) {
        this.rulesRepository = rulesRepository;
        this.portfolioService = portfolioService;
    }

    @Override
    public void save(Rule rule) {
        rulesRepository.save(rule);
    }

    @Override
    public Rule initBaseRules() {
        Rule rule = new Rule();
        save(rule);
        return rule;
    }

    @Override
    public Rule getRulesByUsernameAndPortfolioType(String username, PortfolioTypeEnum portfolioType) {
        Rule rule = portfolioService.getPortfolioByUsernameAndType(username, portfolioType).getRule();
        if (rule == null) {
            throw new RuleNotFoundException("Rule not found");
        }
        return rule;
    }

    @Override
    public PortfolioRuleDTO getRulesDTOByUsernameAndPortfolioType(String username, PortfolioTypeEnum portfolioType) {
        Rule rule = getRulesByUsernameAndPortfolioType(username, portfolioType);
        return new PortfolioRuleDTO(portfolioType, rule.getStopLossPercentage(),
                rule.getRecurringAllocationAmount(), rule.getRecurringAllocationDay());
    }

    @Override
    @Transactional
    public PortfolioRuleDTO update(String username, PortfolioRuleDTO portfolioRuleDTO) {
        Rule rule = getRulesByUsernameAndPortfolioType(username, portfolioRuleDTO.getPortfolioType());
        Portfolio portfolio = portfolioService.getPortfolioByUsernameAndType(username, portfolioRuleDTO.getPortfolioType());

        rule.setStopLossInitialValue(portfolio.getCurrentValue());
        rule.setStopLossPercentage(portfolioRuleDTO.getStopLoss());
        rule.setRecurringAllocationAmount(portfolioRuleDTO.getRecurringAllocationAmount());
        rule.setRecurringAllocationDay(portfolioRuleDTO.getRecurringAllocationDay());

        rulesRepository.save(rule);
        return portfolioRuleDTO;
    }

    @Override
    @Transactional
    public ResetStopLossTriggerResponseDTO resetStopLossTrigger(String username, ResetStopLossTriggerDTO resetStopLossTriggerDTO) {
        Rule rule = getRulesByUsernameAndPortfolioType(username, resetStopLossTriggerDTO.getPortfolioType());
        Portfolio portfolio = portfolioService.getPortfolioByUsernameAndType(username, resetStopLossTriggerDTO.getPortfolioType());
        setStopLossInitialValue(rule, portfolio.getCurrentValue());
        return new ResetStopLossTriggerResponseDTO("Stop loss reset success");
    }

    @Override
    @Transactional
    public void setStopLossInitialValue(Rule rule, BigDecimal stopLossInitialValue) {
        if (rule != null) {
            rule.setStopLossInitialValue(stopLossInitialValue);
            save(rule);
        }
    }
}
