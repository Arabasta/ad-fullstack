package com.robotrader.spring.trading.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WebSocketConnectionManager {
    private final List<MarketDataWebSocketService> webSocketServices = new ArrayList<>();

    public void addWebSocketService(MarketDataWebSocketService service) {
        webSocketServices.add(service);
    }

    public void disconnectAll() {
        webSocketServices.forEach(service -> {
            service.disconnect();
        });
    }
}