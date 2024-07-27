package com.robotrader.spring.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CryptoLiveData {
    private String ev; // event
    private String pair; // crypto pair
    private BigDecimal v;  // volume
    private BigDecimal vw; // volume weighted average price
    private int z;         // average trade size
    private BigDecimal o;  // open price
    private BigDecimal c;  // close price
    private BigDecimal h;  // high price
    private BigDecimal l;  // low price
    private long s;        // start timestamp
    private long e;        // end timestamp
}
