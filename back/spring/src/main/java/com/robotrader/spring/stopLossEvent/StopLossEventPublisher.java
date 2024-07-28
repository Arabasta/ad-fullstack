package com.robotrader.spring.stopLossEvent;

import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.Rule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class StopLossEventPublisher {

    private final ApplicationEventPublisher eventPublisher;

    @Autowired
    public StopLossEventPublisher(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    public void evaluateStopLossRules(Portfolio portfolio) {
        Rule rule = portfolio.getRule();
        if (rule == null)
            return;

        boolean stopLossTriggered = checkStopLoss(portfolio);
        if (stopLossTriggered)
            eventPublisher.publishEvent(new StopLossTriggeredEvent(this, portfolio));
    }

    private boolean checkStopLoss(Portfolio portfolio) {
        if (portfolio.getRule().getStopLossPercentage() != null) {
            Double stopLossPercentage = portfolio.getRule().getStopLossPercentage();
            BigDecimal stopLossInitialValue = portfolio.getRule().getStopLossInitialValue();
            BigDecimal currentValue = portfolio.getCurrentValue();

            BigDecimal stopLossValue = stopLossInitialValue.multiply(BigDecimal.valueOf(1 - stopLossPercentage));
            return (currentValue.compareTo(stopLossValue) < 0);
        }
        return false;
    }
}
