package com.robotrader.spring.trading.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = true)
public abstract class LiveMarketDataDTO extends MarketDataDTO {

    public abstract String getTicker();

    private String ev;       // Event type
    private int z;           // Average trade size
    private long s;          // Start timestamp
    private long e;          // End timestamp
}
