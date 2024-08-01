package com.robotrader.spring.trading.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class TickerDataDTO {
    private boolean active;
    private String cik;
    @JsonProperty("composite_figi")
    private String compositeFigi;
    @JsonProperty("currency_name")
    private String currencyName;
    @JsonProperty("last_updated_utc")
    private ZonedDateTime lastUpdatedUtc;
    private String locale;
    private String market;
    private String name;
    @JsonProperty("primary_exchange")
    private String primaryExchange;
    @JsonProperty("share_class_figi")
    private String shareClassFigi;
    private String ticker;
    private String type;
}
