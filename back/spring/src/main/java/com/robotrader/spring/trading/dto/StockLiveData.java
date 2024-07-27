package com.robotrader.spring.trading.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class StockLiveData {
    private String ev;       // Event type
    private String sym;      // Ticker
    private int v;           // Volume
    private int av;          // Accumulated volume
    private BigDecimal op;   // Today's open price
    private BigDecimal vw;   // Volume weighted average price
    private BigDecimal o;    // Open price
    private BigDecimal c;    // Clos price
    private BigDecimal h;    // High price
    private BigDecimal l;    // Low price
    private BigDecimal a;    // Today's volume weighted average price
    private int z;           // Average trade size
    private long s;          // Start timestamp
    private long e;          // End timestamp
}
