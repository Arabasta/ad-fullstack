package com.robotrader.spring.trading.buySignalEvent;

import org.springframework.context.ApplicationEvent;

public class BuySignalEvent extends ApplicationEvent {
    public BuySignalEvent(Object source) {
        super(source);
    }
}
