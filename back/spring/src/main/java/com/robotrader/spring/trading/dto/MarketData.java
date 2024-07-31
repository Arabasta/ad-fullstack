package com.robotrader.spring.trading.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class MarketData {
    private int v;           // Volume
    private BigDecimal vw;   // Volume weighted average price
    private BigDecimal o;    // Open price
    private BigDecimal c;    // Close price
    private BigDecimal h;    // High price
    private BigDecimal l;    // Low price
}
