package com.robotrader.spring.trading.service;

import com.robotrader.spring.exception.notFound.TickerNotFoundException;
import com.robotrader.spring.trading.dto.MarketDataApiResponseDTO;
import com.robotrader.spring.trading.dto.HistoricalDataDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class HistoricalDataApiService {
    private WebClient polygonWebClient;
    private static final String MULTIPLIER = "10";
    private static final String TIMESPAN = "minute";

    public HistoricalDataApiService(WebClient polygonWebClient) {
        this.polygonWebClient = polygonWebClient;
    }

    public Flux<HistoricalDataDTO> getMarketDataByTicker(String ticker) {
        String path = "/v2/aggs/ticker/{stocksTicker}/range/{multiplier}/{timespan}/{from}/{to}";
        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String toDate = LocalDate.now().format(df);
        String fromDate = LocalDate.parse(toDate, df).minusWeeks(1).format(df);

        Mono<MarketDataApiResponseDTO> dataStream = polygonWebClient.get()
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
                .bodyToMono(MarketDataApiResponseDTO.class)
                .doOnNext(response -> System.out.println("API Response: " + response))
                .doOnError(error -> System.err.println("Error in API call: " + error.getMessage()));

        return dataStream
                .flatMap(response -> {
                    if (response.getResultsCount() == 0) {
                        return Mono.error(new TickerNotFoundException("Ticker not found in API call: " + ticker));
                    }
                    return Mono.just(response);
                })
                .flatMapMany(response ->  Flux.fromIterable(response.getResults()))
                .switchIfEmpty(Mono.error(new RuntimeException("No results found in the API response")))
                .doOnError(error -> System.err.println("Error fetching prices: " + error.getMessage() + ticker));
    }
}