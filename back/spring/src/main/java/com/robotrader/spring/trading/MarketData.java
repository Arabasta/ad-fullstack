package com.robotrader.spring.trading;

import com.robotrader.spring.dto.StockData;
import com.robotrader.spring.service.api.StockApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MarketData {
    private final StockApiService stockApiService;

    @Autowired
    public MarketData(StockApiService stockApiService) {
        this.stockApiService = stockApiService;
    }

    public Mono<Map<String, List<Object>>> getHistoricalMarketData(String stockTicker) {
        return stockApiService.getStockDataByTicker(stockTicker)
                .collectList()
                .map(stockDataList -> {
                    Map<String, List<Object>> stockData = new HashMap<>();
                    List<Long> timestamp = new ArrayList<>();
                    List<BigDecimal> openPrices = new ArrayList<>();
                    List<BigDecimal> closePrices = new ArrayList<>();
                    List<BigDecimal> highPrices = new ArrayList<>();
                    List<BigDecimal> lowPrices = new ArrayList<>();

                    // Get stock prices in ascending order by time
                    for (StockData data : stockDataList) {
                        timestamp.add(data.getTimestamp());
                        openPrices.add(0, data.getOpenPrice());
                        closePrices.add(0, data.getClosePrice());
                        highPrices.add(0, data.getHighPrice());
                        lowPrices.add(0, data.getLowPrice());
                    }
                    stockData.put("timestamp", new ArrayList<>(timestamp));
                    stockData.put("open", new ArrayList<>(openPrices));
                    stockData.put("close", new ArrayList<>(closePrices));
                    stockData.put("high", new ArrayList<>(highPrices));
                    stockData.put("low", new ArrayList<>(lowPrices));

                    return stockData;
                });
    }

    public void getLiveMarketData(String stockTicker) {}
}