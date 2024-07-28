package com.robotrader.spring.scheduler;

import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.service.interfaces.IPortfolioService;
import com.robotrader.spring.stopLossEvent.StopLossEventPublisher;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class PortfolioRuleScheduler {

    private final StopLossEventPublisher stopLossEventPublisher;
    private final IPortfolioService portfolioService;

    @Autowired
    public PortfolioRuleScheduler(StopLossEventPublisher stopLossEventPublisher, IPortfolioService portfolioService) {
        this.stopLossEventPublisher = stopLossEventPublisher;
        this.portfolioService = portfolioService;
    }

    @Scheduled(fixedRate = 60000) // Check every 10 mins
    @Transactional
    public void evaluateStopLossRuleForAllPortfolios() {
        for (Portfolio portfolio : portfolioService.getPortfolios()) {
            stopLossEventPublisher.evaluateStopLossRules(portfolio);
        }
    }

    @Scheduled(cron = "0 0 0 * * *") // Check at midnight daily
    @Transactional
    public void evaluateRecurringAllocationRuleForAllPortfolios() {
        List<Portfolio> portfolios = portfolioService.getPortfolios();
        int currentDayOfMonth = LocalDate.now().getDayOfMonth();
        for (Portfolio portfolio : portfolios) {
            Integer recurringAllocationDay = portfolio.getRule().getRecurringAllocationDay();
            if (recurringAllocationDay != null && recurringAllocationDay == currentDayOfMonth) {
                portfolioService.handleRecurringAllocation(portfolio);
            }
        }
    }
}
