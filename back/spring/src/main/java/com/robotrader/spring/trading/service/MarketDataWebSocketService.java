package com.robotrader.spring.trading.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.robotrader.spring.trading.dto.LiveMarketDataDTO;
import com.robotrader.spring.trading.interfaces.MarketDataWebSocketHandler;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.concurrent.CompletableFuture;

// Reference: https://www.geeksforgeeks.org/spring-boot-web-socket/
public abstract class MarketDataWebSocketService extends TextWebSocketHandler implements MarketDataWebSocketHandler {
    protected final ObjectMapper objectMapper = new ObjectMapper();
    WebSocketSession session ;
    @Value("${POLYGON_API_KEY}")
    protected String apiKey;
    protected CompletableFuture<Void> authenticationFuture = new CompletableFuture<>();
    // Sink publisher can emit multiple elements and have multiple subscribers, with buffering of element
    protected Sinks.Many<LiveMarketDataDTO> marketDataSink;
    protected Flux<LiveMarketDataDTO> marketDataFlux;
    @Getter
    @Setter
    protected boolean isConnectedAndAuthenticated = false;

    @Override
    public abstract String getEventType();
    @Override
    public abstract String getSubscriberPrefix();
    @Override
    public abstract String getWebSocketEndpoint();
    @Override
    public abstract void handleMarketData(JsonNode event);

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
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
        resetMarketDataSink();
        WebSocketClient client = new StandardWebSocketClient();
        WebSocketHttpHeaders headers = new WebSocketHttpHeaders();
        String endpoint = getWebSocketEndpoint();
        client.execute(this, headers, URI.create(endpoint))
                .thenAccept(webSocketSession -> {
                    this.session = webSocketSession;
                    System.out.println("Connected to WebSocket server: " + getWebSocketEndpoint());
                    try {
                        authenticate();
                    } catch (IOException e) {
                        System.err.println("Failed to authenticate: " + e.getMessage());
                    }
                })
                .exceptionally(throwable -> {
                    System.err.println("Failed to connect: " + throwable.getMessage());
                    return null;
                });
    }

    private void authenticate() throws IOException {
        String authMessage = "{\"action\":\"auth\",\"params\":\"" + apiKey + "\"}";
        session.sendMessage(new TextMessage(authMessage));
    }

    public void subscribe(List<String> tickers) {
        authenticationFuture.thenRun(() -> {
            isConnectedAndAuthenticated = true;
            try {
                StringBuilder param = new StringBuilder("\"");
                String prefix = getSubscriberPrefix();
                for (String ticker : tickers) {
                    param.append(prefix).append(ticker).append(",");
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
        if (eventType.equals(getEventType())) {
            handleMarketData(event);
        } else if (eventType.equals("status")) {
            handleStatusEvent(event);
        } else {
            System.out.println("Unhandled event type: " + eventType);
        }
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

    public void resetMarketDataSink() {
        marketDataSink = Sinks.many().multicast().onBackpressureBuffer();
        marketDataFlux = marketDataSink.asFlux();
    }

    public Flux<LiveMarketDataDTO> getLiveMarketDataFlux() {
        System.out.println("MarketDataWebSocketService: get live market data flux");
        return marketDataFlux;
    }
}