package com.robotrader.spring.trading.interfaces;

import com.fasterxml.jackson.databind.JsonNode;

public interface MarketDataWebSocketHandler {
    String getWebSocketEndpoint();
    String getEventType();
    String getSubscriberPrefix();
    void handleMarketData(JsonNode event);
}
