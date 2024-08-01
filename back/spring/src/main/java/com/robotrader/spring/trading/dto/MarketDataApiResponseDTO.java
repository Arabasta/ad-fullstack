package com.robotrader.spring.trading.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class MarketDataApiResponseDTO {
    private boolean adjusted;
    @JsonProperty("next_url")
    private String nextUrl;
    private int queryCount;
    @JsonProperty("request_id")
    private String requestId;
    private List<HistoricalDataDTO> results;
    private int resultsCount;
    private String status;
    private String ticker;
}