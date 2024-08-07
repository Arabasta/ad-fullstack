package com.robotrader.spring.dto.ticker;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class TickerNewsPublishersDTO {
    @JsonProperty("favicon_url")
    private String faviconUrl;
    @JsonProperty("homepage_url")
    private String homepageUrl;
    @JsonProperty("logo_url")
    private String logoUrl;
    private String name;
}
