package com.robotrader.spring.trading.service;

import com.robotrader.spring.exception.notFound.TickerNotFoundException;
import com.robotrader.spring.service.TickerService;
import com.robotrader.spring.trading.dto.TickerDataApiResponseDTO;
import com.robotrader.spring.trading.dto.TickerDataDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class TickerDataApiService {
    private final TickerService tickerService;
    private WebClient polygonWebClient;

    public TickerDataApiService(WebClient polygonWebClient, TickerService tickerService) {
        this.polygonWebClient = polygonWebClient;
        this.tickerService = tickerService;
    }

    public Flux<TickerDataDTO> getStockTickerDataByTicker(String ticker) {
        String path = "/v3/reference/tickers";

        Mono<TickerDataApiResponseDTO> dataStream = polygonWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(path)
                        .queryParam("ticker", ticker)
                        .queryParam("market", "stocks")
                        .queryParam("active", true)
                        .queryParam("limit", 1000)
                        .build())
                .retrieve()
                .onStatus(status -> status.is4xxClientError(), response ->
                        Mono.error(new RuntimeException("4xx error")))
                .onStatus(status -> status.is5xxServerError(), response ->
                        Mono.error(new RuntimeException("5xx error")))
                .bodyToMono(TickerDataApiResponseDTO.class)
                .doOnNext(response -> System.out.println("API Response: " + response))
                .doOnError(error -> System.err.println("Error in API call: " + error.getMessage()));

        return dataStream
                .flatMap(response -> {
                    if (response.getResults().isEmpty() || response.getResults().get(0) == null ) {
                        return Mono.error(new TickerNotFoundException("Ticker not found in API call: " + ticker));
                    }
                    return Mono.just(response);
                })
                .flatMapMany(response ->  Flux.fromIterable(response.getResults()))
                .switchIfEmpty(Mono.error(new RuntimeException("No results found in the API response")))
                .doOnError(error -> System.err.println("Error fetching ticker: " + error.getMessage() + ticker));
    }
}
