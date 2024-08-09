package com.robotrader.spring.trading.service;

import com.robotrader.spring.exception.notFound.TickerNotFoundException;
import com.robotrader.spring.trading.dto.MarketDataApiResponseDTO;
import com.robotrader.spring.trading.dto.HistoricalDataDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class HistoricalDataApiService {
    private final WebClient polygonWebClient;
    private static final String ENDPOINT_PATH = "/v2/aggs/ticker/{stocksTicker}/range/{multiplier}/{timespan}/{from}/{to}";
    private static final String MULTIPLIER = "10";
    private static final String TIMESPAN = "minute";
    private static final Logger logger = LoggerFactory.getLogger(HistoricalDataApiService.class);

    public HistoricalDataApiService(WebClient polygonWebClient) {
        this.polygonWebClient = polygonWebClient;
    }

    public Flux<HistoricalDataDTO> getMarketDataByTicker(String ticker) {
        String path = ENDPOINT_PATH;
        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String toDate = LocalDate.now().format(df);
        String fromDate = LocalDate.parse(toDate, df).minusWeeks(1).format(df);

        Mono<MarketDataApiResponseDTO> dataStream = polygonWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(path)
                        .queryParam("adjusted", "true")
                        .queryParam("sort", "desc")
                        .queryParam("limit", 5000)
                        .build(ticker, MULTIPLIER, TIMESPAN, fromDate, toDate))
                .retrieve()
                .onStatus(status -> status.is4xxClientError(), response -> {
                    logger.error("4xx error occurred for ticker: {}", ticker);
                    return Mono.error(new RuntimeException("4xx error"));
                })
                .onStatus(status -> status.is5xxServerError(), response -> {
                    logger.error("5xx error occurred for ticker: {}", ticker);
                    return Mono.error(new RuntimeException("5xx error"));
                })
                .bodyToMono(MarketDataApiResponseDTO.class)
                .doOnError(error -> logger.error("Error in API call: {}", error.getMessage()));

        return dataStream
                .flatMap(response -> {
                    if (response.getResultsCount() == 0) {
                        logger.warn("Ticker not found in API call: {}", ticker);
                        return Mono.error(new TickerNotFoundException("Ticker not found in API call: " + ticker));
                    }
                    return Mono.just(response);
                })
                .flatMapMany(response ->  Flux.fromIterable(response.getResults()))
                .switchIfEmpty(Mono.error(new RuntimeException("No results found in the API response")))
                .doOnError(error -> logger.error("Error fetching prices: {}{}", error.getMessage(), ticker));
    }
}