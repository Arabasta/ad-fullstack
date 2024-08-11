package com.robotrader.spring.trading.buySignalEvent;

import com.robotrader.spring.trading.service.TradingApplicationService;
import com.robotrader.spring.trading.strategy.TradingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class BuySignalListener {
    private final TradingApplicationService tradingApplicationService;

    @Autowired
    public BuySignalListener(TradingApplicationService tradingApplicationService) {
        this.tradingApplicationService = tradingApplicationService;
    }

    @EventListener
    public void onBuySignalEvent(BuySignalEvent event) {
        for (TradingContext tradingContext : tradingApplicationService.getTradingContexts()){
            tradingContext.setBuySignalTrigger();
        }
    }
}
