package com.robotrader.spring.trading.service;

import com.robotrader.spring.model.enums.TickerTypeEnum;
import org.springframework.stereotype.Component;

@Component
public class WebSocketServiceFactory {
    private final CryptoWebSocketService cryptoWebSocketService;
    private final StockWebSocketService stockWebSocketService;

    public WebSocketServiceFactory(CryptoWebSocketService cryptoWebSocketService, StockWebSocketService stockWebSocketService) {
        this.cryptoWebSocketService = cryptoWebSocketService;
        this.stockWebSocketService = stockWebSocketService;
    }

    public MarketDataWebSocketService createWebSocketService(TickerTypeEnum tickerType) {
        switch (tickerType) {
            case CRYPTO -> {
                return cryptoWebSocketService;
            }
            case STOCKS -> {
                return stockWebSocketService;
            }
            default -> {
                return null;
            }
        }
    }
}
