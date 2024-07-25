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

    public Mono<Map<String, List<BigDecimal>>> getHistoricalMarketData(String stockTicker) {
        return stockApiService.getStockDataByTicker(stockTicker)
                .collectList()
                .map(stockDataList -> {
                    Map<String, List<BigDecimal>> stockPrices = new HashMap<>();
                    List<BigDecimal> openPrices = new ArrayList<>();
                    List<BigDecimal> closePrices = new ArrayList<>();
                    List<BigDecimal> highPrices = new ArrayList<>();
                    List<BigDecimal> lowPrices = new ArrayList<>();

                    // Get stock prices in ascending order by time
                    for (StockData stockData : stockDataList) {
                        openPrices.add(0, stockData.getOpenPrice());
                        closePrices.add(0, stockData.getClosePrice());
                        highPrices.add(0, stockData.getHighPrice());
                        lowPrices.add(0, stockData.getLowPrice());
                    }

                    stockPrices.put("open", openPrices);
                    stockPrices.put("close", closePrices);
                    stockPrices.put("high", highPrices);
                    stockPrices.put("low", lowPrices);

                    return stockPrices;
                });
    }
}