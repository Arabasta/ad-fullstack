package com.robotrader.spring.trading.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = true)
public class HistoricalData extends MarketData {
    private int n;  // Number of transactions
    private long t;  // Unix Timestamp
}
