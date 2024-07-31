package com.robotrader.spring.trading.service;

import com.robotrader.spring.trading.dto.MarketDataApiResponse;
import com.robotrader.spring.trading.dto.HistoricalData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class HistoricalDataApiService {
    private WebClient webClient;
    private static final String MULTIPLIER = "10";
    private static final String TIMESPAN = "minute";
    private static final String API_ENDPOINT = "https://api.polygon.io/";

    public HistoricalDataApiService(WebClient.Builder webClientBuilder, @Value("${POLYGON_API_KEY}") String apiKey) {
        this.webClient = webClientBuilder
                .baseUrl(API_ENDPOINT)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .build();
    }

    public Flux<HistoricalData> getMarketDataByTicker(String ticker) {
        String path = "/v2/aggs/ticker/{stocksTicker}/range/{multiplier}/{timespan}/{from}/{to}";
        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String toDate = LocalDate.now().format(df);
        String fromDate = LocalDate.parse(toDate, df).minusWeeks(1).format(df);

        Mono<MarketDataApiResponse> dataStream = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(path)
                        .queryParam("adjusted", "true")
                        .queryParam("sort", "desc")
                        .queryParam("limit", 1000)
                        .build(ticker, MULTIPLIER, TIMESPAN, fromDate, toDate))
                .retrieve()
                .onStatus(status -> status.is4xxClientError(), response ->
                        Mono.error(new RuntimeException("4xx error")))
                .onStatus(status -> status.is5xxServerError(), response ->
                        Mono.error(new RuntimeException("5xx error")))
                .bodyToMono(MarketDataApiResponse.class)
                .doOnNext(response -> System.out.println("API Response: " + response))
                .doOnError(error -> System.err.println("Error in API call: " + error.getMessage()));

        return dataStream
                .flatMapMany(response ->  Flux.fromIterable(response.getResults()))
                .switchIfEmpty(Mono.error(new RuntimeException("No results found in the API response")))
                .doOnError(error -> System.err.println("Error fetching prices: " + error.getMessage() + ticker));
    }
}