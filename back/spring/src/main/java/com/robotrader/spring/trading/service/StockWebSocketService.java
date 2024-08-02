package com.robotrader.spring.trading.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.robotrader.spring.trading.dto.StockLiveDataDTO;
import org.springframework.stereotype.Service;

@Service
public class StockWebSocketService extends MarketDataWebSocketService {
    private static final String STOCK_WEBSOCKET_ENDPOINT = "wss://delayed.polygon.io/stocks";

    @Override
    public String getWebSocketEndpoint() {
        return STOCK_WEBSOCKET_ENDPOINT;
    }

    @Override
    public String getEventType() {
        return "A";
    }

    @Override
    public String getSubscriberPrefix() {
        return getEventType() + ".";
    }

    @Override
    public void handleMarketData(JsonNode event) {
        StockLiveDataDTO stockData = new StockLiveDataDTO();

        stockData.setEv(event.get("ev").asText());
        stockData.setSym(event.get("sym").asText());
        stockData.setV(event.get("v").asInt());
        stockData.setAv(event.get("av").asInt());
        stockData.setOp(event.get("op").decimalValue());
        stockData.setVw(event.get("vw").decimalValue());
        stockData.setO(event.get("o").decimalValue());
        stockData.setC(event.get("c").decimalValue());
        stockData.setH(event.get("h").decimalValue());
        stockData.setL(event.get("l").decimalValue());
        stockData.setA(event.get("a").decimalValue());
        stockData.setZ(event.get("z").asInt());
        stockData.setS(event.get("s").asLong());
        stockData.setE(event.get("e").asLong());

        System.out.println("Stock Data: " + stockData);

        marketDataSink.tryEmitNext(stockData);
    }
}
