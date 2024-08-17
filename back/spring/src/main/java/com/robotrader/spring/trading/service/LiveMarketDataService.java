package com.robotrader.spring.trading.service;

import com.robotrader.spring.model.Ticker;
import com.robotrader.spring.service.TickerService;
import com.robotrader.spring.trading.dto.LiveMarketDataDTO;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class LiveMarketDataService {
    private final CryptoWebSocketService cryptoWebSocketService;
    private final StockWebSocketService stockWebSocketService;
    private final TickerService tickerService;
    @Getter
    private static boolean isRunning;

    @Autowired
    public LiveMarketDataService(CryptoWebSocketService cryptoWebSocketService, StockWebSocketService stockWebSocketService, TickerService tickerService) {
        this.cryptoWebSocketService = cryptoWebSocketService;
        this.stockWebSocketService = stockWebSocketService;
        this.tickerService = tickerService;
    }

    public void subscribeToLiveMarketData() {
        cryptoWebSocketService.connect();
        Set<String> cryptoTickers = tickerService.getAllCrytpoTickerName()
                .stream()
                .map(Ticker::getTickerName)
                .collect(Collectors.toSet());
        cryptoWebSocketService.subscribe(cryptoTickers);

        Set<String> stockTickers = tickerService.getAllStockTickerName()
                .stream()
                .map(Ticker::getTickerName)
                .collect(Collectors.toSet());
        stockWebSocketService.connect();
        stockWebSocketService.subscribe(stockTickers);

        isRunning = true;
    }

    public void disconnectLiveMarketData() {
        cryptoWebSocketService.disconnect();
        stockWebSocketService.disconnect();
        isRunning = false;
    }

    public Flux<LiveMarketDataDTO> getLiveCryptoDataFlux() {
        return cryptoWebSocketService.getLiveMarketDataFlux();
    }

    public Flux<LiveMarketDataDTO> getLiveStocksDataFlux() {
        return stockWebSocketService.getLiveMarketDataFlux();
    }
}
