package com.robotrader.spring.dto.ticker;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class TickerNewsInsightsDTO {
    private String sentiment;
    @JsonProperty("sentiment_reasoning")
    private String sentimentReasoning;
    private String ticker;
}
