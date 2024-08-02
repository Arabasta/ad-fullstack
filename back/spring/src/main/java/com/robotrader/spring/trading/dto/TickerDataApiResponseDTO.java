package com.robotrader.spring.trading.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class TickerDataApiResponseDTO {
    private int count;
    @JsonProperty("next_url")
    private String nextUrl;
    @JsonProperty("request_id")
    private String requestId;
    private List<TickerDataDTO> results;
    private String status;
}
