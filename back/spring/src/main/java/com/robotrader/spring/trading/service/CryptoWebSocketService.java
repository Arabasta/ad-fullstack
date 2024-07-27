package com.robotrader.spring.trading.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.robotrader.spring.dto.CryptoLiveData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.concurrent.CompletableFuture;

// Reference: https://www.geeksforgeeks.org/spring-boot-web-socket/
@Service
public class CryptoWebSocketService extends TextWebSocketHandler {
    private static final String CRYPTO_WEBSOCKET_ENDPOINT = "wss://socket.polygon.io/crypto";
    private final ObjectMapper objectMapper = new ObjectMapper();
    WebSocketSession session ;
    @Value("${POLYGON_API_KEY}")
    private String apiKey;
    private CompletableFuture<Void> authenticationFuture = new CompletableFuture<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        this.session = session;
        System.out.println("Connected to WebSocket server");
        authenticate();
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        authenticationFuture = new CompletableFuture<>();
        System.out.println("WebSocket connection closed: " + status);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        super.handleTextMessage(session, message);
        try {
            JsonNode jsonNode = objectMapper.readTree(message.asBytes());
            if (jsonNode.isArray()) {
                for (JsonNode node : jsonNode) {
                    processEvent(node);
                }
            } else {
                processEvent(jsonNode);
            }
        } catch (Exception e) {
            System.out.println("Failed to parse message: " + e.getMessage());
        }
    }

    public void connect() {
        WebSocketClient client = new StandardWebSocketClient();
        WebSocketHttpHeaders headers = new WebSocketHttpHeaders();

        client.doHandshake(this, headers, URI.create(CRYPTO_WEBSOCKET_ENDPOINT));
    }

    private void authenticate() throws IOException {
        String authMessage = "{\"action\":\"auth\",\"params\":\"" + apiKey + "\"}";
        session.sendMessage(new TextMessage(authMessage));
    }

    public void subscribe(List<String> cryptoTickers) {
        authenticationFuture.thenRun(() -> {
            try {
                StringBuilder param = new StringBuilder("\"");
                for (String ticker : cryptoTickers) {
                    param.append("XAS.X:").append(ticker).append(",");
                }
                param.setLength(param.length() - 1);
                param.append("\"");
                String subscribeMessage = "{\"action\":\"subscribe\",\"params\":" + param + "}";
                session.sendMessage(new TextMessage(subscribeMessage));
            } catch (IOException e) {
                System.err.println("Failed to subscribe: " + e.getMessage());
            }
        });
    }

    private void processEvent(JsonNode event) {
        String eventType = event.get("ev").asText();
        switch (eventType) {
            case "XAS":  // Crypto Aggregate
                handleCryptoData(event);
                break;
            case "status":  // Status messages
                handleStatusEvent(event);
                break;
            default:
                System.out.println("Unhandled event type: " + eventType);
        }
    }

    private void handleCryptoData(JsonNode event) {
        CryptoLiveData cryptoData = new CryptoLiveData();

        cryptoData.setEv(event.get("ev").asText());
        cryptoData.setPair(event.get("pair").asText());
        cryptoData.setV(event.get("v").decimalValue());
        cryptoData.setVw(event.get("vw").decimalValue());
        cryptoData.setZ(event.get("z").asInt());
        cryptoData.setO(event.get("o").decimalValue());
        cryptoData.setC(event.get("c").decimalValue());
        cryptoData.setH(event.get("h").decimalValue());
        cryptoData.setL(event.get("l").decimalValue());
        cryptoData.setS(event.get("s").asLong());
        cryptoData.setE(event.get("e").asLong());

        System.out.println("Crypto Data: " + cryptoData);

        // TODO: Use in LiveTrading to check stop loss or profit target
    }

    private void handleStatusEvent(JsonNode event) {
        String status = event.get("status").asText();
        String message = event.get("message").asText();
        System.out.println("Status: " + status + " - " + message);

        // Only allow subscribe to run once authenticated
        if (status.equals("auth_success")) {
            authenticationFuture.complete(null);
        }
    }

    public void disconnect() {
        if (session != null && session.isOpen()) {
            try {
                session.close();
                System.out.println("WebSocket disconnected");
            } catch (IOException e) {
                System.err.println("Error while disconnecting: " + e.getMessage());
            }
        } else {
            System.out.println("WebSocket is not connected");
        }
    }
}