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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RuleServiceTest {

    @Mock
    private RulesRepository rulesRepository;

    @Mock
    private IPortfolioService portfolioService;

    @InjectMocks
    private RuleService ruleService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testInitBaseRules_Success() {
        Rule rule = new Rule();
        when(rulesRepository.save(any(Rule.class))).thenReturn(rule);

        Rule result = ruleService.initBaseRules();

        assertNotNull(result);
        verify(rulesRepository).save(any(Rule.class));
    }

    @Test
    void testGetRulesByUsernameAndPortfolioType_Success() {
        Rule rule = new Rule();
        Portfolio portfolio = new Portfolio();
        portfolio.setRule(rule);

        when(portfolioService.getPortfolioByUsernameAndType("user", PortfolioTypeEnum.CONSERVATIVE)).thenReturn(portfolio);

        Rule result = ruleService.getRulesByUsernameAndPortfolioType("user", PortfolioTypeEnum.CONSERVATIVE);

        assertNotNull(result);
        assertEquals(rule, result);
    }

    @Test
    void testGetRulesByUsernameAndPortfolioType_RuleNotFound() {
        Portfolio portfolio = new Portfolio();
        portfolio.setRule(null);

        when(portfolioService.getPortfolioByUsernameAndType("user", PortfolioTypeEnum.CONSERVATIVE)).thenReturn(portfolio);

        assertThrows(RuleNotFoundException.class, () -> {
            ruleService.getRulesByUsernameAndPortfolioType("user", PortfolioTypeEnum.CONSERVATIVE);
        });
    }

    @Test
    void testUpdateRule_Success() {
        Rule rule = new Rule();
        Portfolio portfolio = new Portfolio();
        portfolio.setCurrentValue(BigDecimal.valueOf(1000));
        portfolio.setRule(rule);

        PortfolioRuleDTO portfolioRuleDTO = new PortfolioRuleDTO(PortfolioTypeEnum.CONSERVATIVE, 0.1, BigDecimal.valueOf(100), 5);

        when(portfolioService.getPortfolioByUsernameAndType("user", PortfolioTypeEnum.CONSERVATIVE)).thenReturn(portfolio);

        PortfolioRuleDTO result = ruleService.update("user", portfolioRuleDTO);

        assertNotNull(result);
        assertEquals(0.1, rule.getStopLossPercentage());
        assertEquals(BigDecimal.valueOf(100), rule.getRecurringAllocationAmount());
        assertEquals(5, rule.getRecurringAllocationDay());

        verify(rulesRepository).save(rule);
    }

    @Test
    void testResetStopLossTrigger_Success() {
        Rule rule = new Rule();
        Portfolio portfolio = new Portfolio();
        portfolio.setCurrentValue(BigDecimal.valueOf(1000));
        portfolio.setRule(rule);

        ResetStopLossTriggerDTO resetStopLossTriggerDTO = new ResetStopLossTriggerDTO();
        resetStopLossTriggerDTO.setPortfolioType(PortfolioTypeEnum.CONSERVATIVE);

        when(portfolioService.getPortfolioByUsernameAndType("user", PortfolioTypeEnum.CONSERVATIVE)).thenReturn(portfolio);

        ResetStopLossTriggerResponseDTO result = ruleService.resetStopLossTrigger("user", resetStopLossTriggerDTO);

        assertNotNull(result);
        assertEquals("Stop loss reset success", result.getMessage());
        assertEquals(BigDecimal.valueOf(1000), rule.getStopLossInitialValue());

        verify(rulesRepository).save(rule);
    }

    @Test
    void testSetStopLossInitialValue_Success() {
        Rule rule = new Rule();

        ruleService.setStopLossInitialValue(rule, BigDecimal.valueOf(2000));

        assertEquals(BigDecimal.valueOf(2000), rule.getStopLossInitialValue());

        verify(rulesRepository).save(rule);
    }
}
