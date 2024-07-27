package com.robotrader.spring.trading.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CryptoLiveData {
    private String ev; // Event
    private String pair; // Crypto pair
    private int v;  // Volume
    private BigDecimal vw; // Volume weighted average price
    private int z;         // Average trade size
    private BigDecimal o;  // Open price
    private BigDecimal c;  // Close price
    private BigDecimal h;  // High price
    private BigDecimal l;  // Low price
    private long s;        // Start timestamp
    private long e;        // End timestamp
}
