package com.robotrader.spring.trading.service;

import com.robotrader.spring.trading.dto.HistoricalDataDTO;
import com.robotrader.spring.trading.dto.LiveMarketDataDTO;
import com.robotrader.spring.trading.dto.TickerDataApiResponseDTO;
import com.robotrader.spring.trading.dto.TickerDataDTO;
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
    private final TickerDataApiService tickerDataApiService;
    private MarketDataWebSocketService marketDataWebSocketService;


    @Autowired
    public MarketDataService(HistoricalDataApiService historicalDataApiService,
                             TickerDataApiService tickerDataApiService) {
        this.historicalDataApiService = historicalDataApiService;
        this.tickerDataApiService = tickerDataApiService;
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
                    for (HistoricalDataDTO data : stockDataList) {
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

    public Mono<List<TickerDataDTO>> getTickerDataByTicker(String ticker) {
        return tickerDataApiService.getStockTickerDataByTicker(ticker)
                .collectList()
                .map(tickerDataList -> {
                    List<TickerDataDTO> tickerDataDTOList = new ArrayList<>();
                    for (TickerDataDTO data : tickerDataList) {
                        tickerDataDTOList.add(data);
                    }
                    return tickerDataDTOList;
                });
    }


    public void subscribeToLiveMarketData(List<String> tickers, MarketDataWebSocketService marketDataWebSocketService) {
        this.marketDataWebSocketService = marketDataWebSocketService;
        marketDataWebSocketService.connect();
        marketDataWebSocketService.subscribe(tickers);
    }

    public boolean isConnectedAndAuthenticated(){
        return marketDataWebSocketService.isConnectedAndAuthenticated();
    }

    public void disconnectLiveMarketData() {
        marketDataWebSocketService.disconnect();
        marketDataWebSocketService.setConnectedAndAuthenticated(false);
    }

    public Flux<LiveMarketDataDTO> getLiveMarketDataFlux() {
        System.out.println("MarketDataService: Subscribing to live market data flux");
        return marketDataWebSocketService.getLiveMarketDataFlux();
    }
}