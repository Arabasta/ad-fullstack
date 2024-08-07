package com.robotrader.spring.dto.ticker;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.robotrader.spring.trading.dto.TickerDataDTO;
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
