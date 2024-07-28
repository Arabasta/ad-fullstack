package com.robotrader.spring.stopLossEvent;

import com.robotrader.spring.service.interfaces.IPortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class StopLossTriggeredListener {

    private final IPortfolioService portfolioService;

    @Autowired
    public StopLossTriggeredListener(IPortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @EventListener
    public void handleStopLossTriggered(StopLossTriggeredEvent event) {
        portfolioService.handleStopLoss(event.getPortfolio());
    }
}
