package com.robotrader.spring.trading.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = true)
public class LiveMarketData extends MarketData{
    private String ev;       // Event type
    private int z;           // Average trade size
    private long s;          // Start timestamp
    private long e;          // End timestamp
}
