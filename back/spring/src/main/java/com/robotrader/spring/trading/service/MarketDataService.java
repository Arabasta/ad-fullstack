package com.robotrader.spring.trading.service;

import com.robotrader.spring.trading.dto.HistoricalData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MarketDataService {
    private final HistoricalDataApiService historicalDataApiService;
    private final MarketDataWebSocketService stockWebSocketService;
    private final MarketDataWebSocketService cryptoWebSocketService;

    @Autowired
    public MarketDataService(HistoricalDataApiService historicalDataApiService, MarketDataWebSocketService stockWebSocketService, MarketDataWebSocketService cryptoWebSocketService) {
        this.historicalDataApiService = historicalDataApiService;
        this.stockWebSocketService = stockWebSocketService;
        this.cryptoWebSocketService = cryptoWebSocketService;
    }

    public Mono<Map<String, List<Object>>> getHistoricalMarketData(String ticker) {
        return historicalDataApiService.getMarketDataByTicker(ticker)
                .collectList()
                .map(stockDataList -> {
                    Map<String, List<Object>> stockData = new HashMap<>();
                    List<Long> timestamp = new ArrayList<>();
                    List<BigDecimal> openPrices = new ArrayList<>();
                    List<BigDecimal> closePrices = new ArrayList<>();
                    List<BigDecimal> highPrices = new ArrayList<>();
                    List<BigDecimal> lowPrices = new ArrayList<>();

                    // Get stock prices in ascending order by time
                    for (HistoricalData data : stockDataList) {
                        timestamp.add(data.getT());
                        openPrices.add(0, data.getO());
                        closePrices.add(0, data.getC());
                        highPrices.add(0, data.getH());
                        lowPrices.add(0, data.getL());
                    }
                    stockData.put("timestamp", new ArrayList<>(timestamp));
                    stockData.put("open", new ArrayList<>(openPrices));
                    stockData.put("close", new ArrayList<>(closePrices));
                    stockData.put("high", new ArrayList<>(highPrices));
                    stockData.put("low", new ArrayList<>(lowPrices));

                    return stockData;
                });
    }

    public void getLiveStockData(List<String> stockTickers) {
        stockWebSocketService.connect();
        stockWebSocketService.subscribe(stockTickers);
    }

    public void disconnectLiveStockData() {
        stockWebSocketService.disconnect();
    }


    public void getLiveCryptoData(List<String> cryptoTickers) {
        cryptoWebSocketService.connect();
        cryptoWebSocketService.subscribe(cryptoTickers);
    }

    public void disconnectLiveCryptoData() {
        cryptoWebSocketService.disconnect();
    }
}