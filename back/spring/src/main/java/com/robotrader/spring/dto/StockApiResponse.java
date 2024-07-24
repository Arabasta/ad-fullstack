package com.robotrader.spring.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class StockApiResponse {
    private boolean adjusted;
    @JsonProperty("next_url")
    private String nextUrl;
    private int queryCount;
    @JsonProperty("request_id")
    private String requestId;
    private List<StockData> results;
    private int resultsCount;
    private String status;
    private String ticker;
}