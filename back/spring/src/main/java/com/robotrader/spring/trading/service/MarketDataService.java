package com.robotrader.spring.trading.service;

import com.robotrader.spring.trading.dto.HistoricalData;
import com.robotrader.spring.trading.dto.LiveMarketData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MarketDataService {
    private final HistoricalDataApiService historicalDataApiService;
    private MarketDataWebSocketService marketDataWebSocketService;

    @Autowired
    public MarketDataService(HistoricalDataApiService historicalDataApiService) {
        this.historicalDataApiService = historicalDataApiService;
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
                        timestamp.add(0, data.getT());
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


    public void subscribeToLiveMarketData(List<String> tickers, MarketDataWebSocketService marketDataWebSocketService) {
        this.marketDataWebSocketService = marketDataWebSocketService;
        marketDataWebSocketService.connect();
        marketDataWebSocketService.subscribe(tickers);
    }

    public void disconnectLiveMarketData() {
        marketDataWebSocketService.disconnect();
    }

    public Flux<LiveMarketData> getLiveMarketDataFlux() {
        return marketDataWebSocketService.getLiveMarketDataFlux();
    }
}