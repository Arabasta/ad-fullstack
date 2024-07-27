package com.robotrader.spring.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class StockHistoricalData {
    @JsonProperty("c")
    private BigDecimal closePrice;  // Close price

    @JsonProperty("h")
    private BigDecimal highPrice;  // High price

    @JsonProperty("l")
    private BigDecimal lowPrice;  // Low price

    @JsonProperty("n")
    private int numberOfTransactions;  // Number of transactions

    @JsonProperty("o")
    private BigDecimal openPrice;  // Open price

    @JsonProperty("t")
    private long timestamp;  // Unix Timestamp

    @JsonProperty("v")
    private double volume;  // Trading volume

    @JsonProperty("vw")
    private double volumeWeightedAveragePrice;  // Volume weighted average price
}