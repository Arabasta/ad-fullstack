package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.rules.PortfolioRuleDTO;
import com.robotrader.spring.dto.rules.ResetStopLossTriggerDTO;
import com.robotrader.spring.dto.rules.ResetStopLossTriggerResponseDTO;
import com.robotrader.spring.model.Rule;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;

import java.math.BigDecimal;

public interface IRuleService {
    void save(Rule rule);
    Rule initBaseRules();
    Rule getRulesByUsernameAndPortfolioType(String username, PortfolioTypeEnum portfolioType);
    PortfolioRuleDTO getRulesDTOByUsernameAndPortfolioType(String username, PortfolioTypeEnum portfolioType);
    PortfolioRuleDTO update(String username, PortfolioRuleDTO portfolioRuleDTO);
    ResetStopLossTriggerResponseDTO resetStopLossTrigger(String username, ResetStopLossTriggerDTO resetStopLossTriggerDTO);
    void setStopLossInitialValue(Rule rule, BigDecimal stopLossInitialValue);
}
