package com.robotrader.spring.stopLossEvent;

import com.robotrader.spring.model.Portfolio;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class StopLossTriggeredEvent extends ApplicationEvent {

    private final Portfolio portfolio;

    public StopLossTriggeredEvent(Object source, Portfolio portfolio) {
        super(source);
        this.portfolio = portfolio;
    }

}
