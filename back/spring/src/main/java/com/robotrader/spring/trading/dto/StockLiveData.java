package com.robotrader.spring.trading.dto;

import lombok.Data;
import lombok.ToString;

import java.math.BigDecimal;

@Data
@ToString(callSuper = true)
public class StockLiveData extends LiveMarketData {
    private String sym;      // Ticker
    private int av;          // Accumulated volume
    private BigDecimal op;   // Today's open price
    private BigDecimal a;    // Today's volume weighted average price

    @Override
    public String getTicker() {
        return sym;
    }
}
