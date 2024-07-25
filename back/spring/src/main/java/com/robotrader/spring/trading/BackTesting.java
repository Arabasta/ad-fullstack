package com.robotrader.spring.trading;

import com.robotrader.spring.trading.algorithm.TradingAlgorithm;
import com.robotrader.spring.trading.algorithm.TradingAlgorithmOne;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BackTesting {

    public BackTesting() {}

    public void run(String stockTicker, TradingAlgorithm tradingAlgorithm, List<BigDecimal> pricePredictions, Map<String, List<BigDecimal>> priceHistory) {
        // stockTicker for recording buy/sell transactions


        // Loop through price history and execute algo, simulating progress of time
        while (!pricePredictions.isEmpty()) {
            tradingAlgorithm.setPricePredictions(new ArrayList<>(pricePredictions));
            tradingAlgorithm.setPriceHistory(new HashMap<>(priceHistory));
            tradingAlgorithm.execute();
            pricePredictions.remove(0); // Remove the oldest price
            priceHistory.get("open").remove(0);
            priceHistory.get("close").remove(0);
            priceHistory.get("high").remove(0);
            priceHistory.get("low").remove(0);

        }

    }
}