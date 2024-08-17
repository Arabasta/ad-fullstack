package com.robotrader.spring.dto.ticker;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class TickerNewsApiResponseDTO {
    private int count;
    @JsonProperty("next_url")
    private String nextUrl;
    @JsonProperty("request_id")
    private String requestId;
    private List<TickerNewsDTO> results;
    private String status;
}
