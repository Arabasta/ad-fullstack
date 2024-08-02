package com.robotrader.spring.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${POLYGON_API_KEY}")
    private String polygonApiKey;

    @Value("${POLYGON_API_BASE_URL}")
    private String polygonBaseUrl;

    @Bean
    public WebClient polygonWebClient(WebClient.Builder webClientBuilder) {
        return webClientBuilder
                .baseUrl(polygonBaseUrl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + polygonApiKey)
                .build();
    }
}