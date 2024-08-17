package com.robotrader.spring.scheduler;

import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.Rule;
import com.robotrader.spring.service.interfaces.IPortfolioService;
import com.robotrader.spring.stopLossEvent.StopLossEventPublisher;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;

class PortfolioRuleSchedulerTest {

    @Mock
    private StopLossEventPublisher stopLossEventPublisher;

    @Mock
    private IPortfolioService portfolioService;

    private PortfolioRuleScheduler portfolioRuleScheduler;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        portfolioRuleScheduler = new PortfolioRuleScheduler(stopLossEventPublisher, portfolioService);
    }

    @Test
    void testEvaluateStopLossRuleForAllPortfolios_Success() {
        Portfolio portfolio1 = new Portfolio();
        Portfolio portfolio2 = new Portfolio();
        List<Portfolio> portfolios = Arrays.asList(portfolio1, portfolio2);

        when(portfolioService.getPortfolios()).thenReturn(portfolios);

        portfolioRuleScheduler.evaluateStopLossRuleForAllPortfolios();

        verify(portfolioService, times(1)).getPortfolios();
        verify(stopLossEventPublisher, times(1)).evaluateStopLossRules(portfolio1);
        verify(stopLossEventPublisher, times(1)).evaluateStopLossRules(portfolio2);
    }

    @Test
    void testEvaluateRecurringAllocationRuleForAllPortfolios_Success() {
        Portfolio portfolio1 = mock(Portfolio.class);
        Portfolio portfolio2 = mock(Portfolio.class);
        Rule rule1 = mock(Rule.class);
        Rule rule2 = mock(Rule.class);
        List<Portfolio> portfolios = Arrays.asList(portfolio1, portfolio2);

        when(portfolioService.getPortfolios()).thenReturn(portfolios);
        when(portfolio1.getRule()).thenReturn(rule1);
        when(portfolio2.getRule()).thenReturn(rule2);
        when(rule1.getRecurringAllocationDay()).thenReturn(LocalDate.now().getDayOfMonth());
        when(rule2.getRecurringAllocationDay()).thenReturn(LocalDate.now().getDayOfMonth());

        portfolioRuleScheduler.evaluateRecurringAllocationRuleForAllPortfolios();

        verify(portfolioService, times(1)).getPortfolios();
        verify(portfolioService, times(1)).handleRecurringAllocation(portfolio1);
        verify(portfolioService, times(1)).handleRecurringAllocation(portfolio2);
    }

    @Test
    void testEvaluateRecurringAllocationRuleForAllPortfolios_NoMatchingDay() {
        Portfolio portfolio1 = mock(Portfolio.class);
        Portfolio portfolio2 = mock(Portfolio.class);
        Rule rule1 = mock(Rule.class);
        Rule rule2 = mock(Rule.class);
        List<Portfolio> portfolios = Arrays.asList(portfolio1, portfolio2);

        when(portfolioService.getPortfolios()).thenReturn(portfolios);
        when(portfolio1.getRule()).thenReturn(rule1);
        when(portfolio2.getRule()).thenReturn(rule2);
        when(rule1.getRecurringAllocationDay()).thenReturn(LocalDate.now().getDayOfMonth() + 1);
        when(rule2.getRecurringAllocationDay()).thenReturn(LocalDate.now().getDayOfMonth() + 1);

        portfolioRuleScheduler.evaluateRecurringAllocationRuleForAllPortfolios();

        verify(portfolioService, times(1)).getPortfolios();
        verify(portfolioService, never()).handleRecurringAllocation(portfolio1);
        verify(portfolioService, never()).handleRecurringAllocation(portfolio2);
    }
}
