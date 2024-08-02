package com.robotrader.spring.trading.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.math.BigDecimal;

@Data
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class StockLiveDataDTO extends LiveMarketDataDTO {
    private String sym;      // Ticker
    private int av;          // Accumulated volume
    private BigDecimal op;   // Today's open price
    private BigDecimal a;    // Today's volume weighted average price

    @Override
    public String getTicker() {
        return sym;
    }
}
