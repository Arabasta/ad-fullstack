package com.robotrader.spring.trading.service;

import com.robotrader.spring.model.enums.TickerTypeEnum;
import com.robotrader.spring.service.TickerService;
import com.robotrader.spring.trading.dto.LiveMarketDataDTO;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.List;

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
        List<String> cryptoTickers = tickerService.getAllCrytpoTickerName();
        cryptoWebSocketService.subscribe(cryptoTickers);

        List<String> stockTickers = tickerService.getAllStockTickerName();
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
