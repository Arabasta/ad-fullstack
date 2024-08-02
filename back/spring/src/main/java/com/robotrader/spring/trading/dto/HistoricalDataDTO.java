package com.robotrader.spring.trading.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class HistoricalDataDTO extends MarketDataDTO {
    private int n;  // Number of transactions
    private long t;  // Unix Timestamp
}
