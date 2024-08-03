package com.robotrader.spring.trading.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.robotrader.spring.trading.dto.CryptoLiveDataDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class CryptoWebSocketService extends MarketDataWebSocketService {
    private static final String CRYPTO_WEBSOCKET_ENDPOINT = "wss://socket.polygon.io/crypto";
    private static final Logger logger = LoggerFactory.getLogger(CryptoWebSocketService.class);

    @Override
    public String getWebSocketEndpoint() {
        return CRYPTO_WEBSOCKET_ENDPOINT;
    }

    @Override
    public String getEventType() {
        return "XAS";
    }

    @Override
    public String getSubscriberPrefix() {
        return getEventType() + ".";
    }

    @Override
    public void handleMarketData(JsonNode event) {
        CryptoLiveDataDTO cryptoData = new CryptoLiveDataDTO();

        cryptoData.setEv(event.get("ev").asText());
        cryptoData.setPair(event.get("pair").asText());
        cryptoData.setV(event.get("v").asInt());
        cryptoData.setVw(event.get("vw").decimalValue());
        cryptoData.setZ(event.get("z").asInt());
        cryptoData.setO(event.get("o").decimalValue());
        cryptoData.setC(event.get("c").decimalValue());
        cryptoData.setH(event.get("h").decimalValue());
        cryptoData.setL(event.get("l").decimalValue());
        cryptoData.setS(event.get("s").asLong());
        cryptoData.setE(event.get("e").asLong());

        logger.info("Crypto Data: {}", cryptoData);

        marketDataSink.tryEmitNext(cryptoData);
    }
}
