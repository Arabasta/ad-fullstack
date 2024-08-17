package com.robotrader.spring.trading.buySignalEvent;

import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BuySignalEventPublisher {
    private final ApplicationEventPublisher eventPublisher;
    @Setter
    private boolean isLiveTradeRunning = false;

    @Autowired
    public BuySignalEventPublisher(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    @Scheduled(cron = "0 */10 * * * *")
    public void publish() {
        if (isLiveTradeRunning) {
            eventPublisher.publishEvent(new BuySignalEvent(this));
        }
    }
}
