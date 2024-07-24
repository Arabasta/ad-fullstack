package com.robotrader.spring.service.api;

import com.robotrader.spring.dto.StockApiResponse;
import com.robotrader.spring.dto.StockData;
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
public class StockApiService {
    private WebClient webClient;
    private static final String API_ENDPOINT = "https://api.polygon.io/";

    public StockApiService(WebClient.Builder webClientBuilder, @Value("${POLYGON_API_KEY}") String apiKey) {
        this.webClient = webClientBuilder
                .baseUrl(API_ENDPOINT)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .build();
    }

    public Flux<StockData> getOneWeekStockDataByTicker(String stockTicker, String multiplier, String timespan, String toDate) {
        String path = "/v2/aggs/ticker/{stocksTicker}/range/{multiplier}/{timespan}/{from}/{to}";
        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String fromDate = LocalDate.parse(toDate, df).minusWeeks(1).format(df);

        Mono<StockApiResponse> dataStream = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(path)
                        .queryParam("adjusted", "true")
                        .queryParam("sort", "asc")
                        .queryParam("limit", 50000)
                        .build(stockTicker, multiplier, timespan, fromDate, toDate))
                .retrieve()
                .onStatus(status -> status.is4xxClientError(), response ->
                        Mono.error(new RuntimeException("4xx error")))
                .onStatus(status -> status.is5xxServerError(), response ->
                        Mono.error(new RuntimeException("5xx error")))
                .bodyToMono(StockApiResponse.class)
                .doOnNext(response -> System.out.println("API Response: " + response))
                .doOnError(error -> System.err.println("Error in API call: " + error.getMessage()));

        return dataStream
                .flatMapMany(response ->  Flux.fromIterable(response.getResults()))
                .switchIfEmpty(Mono.error(new RuntimeException("No results found in the API response")))
                .doOnError(error -> System.err.println("Error fetching stock prices: " + error.getMessage()));
    }
}