package com.robotrader.spring.trading.buySignalEvent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class BuySignalEventPublisher {

    private final ApplicationEventPublisher eventPublisher;

    @Autowired
    public BuySignalEventPublisher(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    @Scheduled(cron = "*/10 * * * * *") // Runs every 10 seconds for testing
    //    @Scheduled(cron = "0 */10 * * * *") // todo: uncomment Runs every 10 minutes for deployment
    public void publish() {
        eventPublisher.publishEvent(new BuySignalEvent(this));
    }
}
