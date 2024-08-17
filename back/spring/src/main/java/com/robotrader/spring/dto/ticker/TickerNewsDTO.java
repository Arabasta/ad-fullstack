package com.robotrader.spring.dto.ticker;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class TickerNewsDTO {
    @JsonProperty("amp_url")
    private String ampUrl;
    @JsonProperty("article_url")
    private String articleUrl;
    private String author;
    private String description;
    private String id;
    @JsonProperty("image_url")
    private String imageUrl;
    private TickerNewsInsightsDTO[] insights;
    private String[] keywords;
    @JsonProperty("published_utc")
    private String publishedUtc;
    private TickerNewsPublishersDTO publisher;
    private String[] tickers;
    private String title;
}
