package com.robotrader.spring.service;

import com.robotrader.spring.dto.ticker.TickerNewsApiResponseDTO;
import com.robotrader.spring.dto.ticker.TickerNewsDTO;
import com.robotrader.spring.exception.notFound.TickerNotFoundException;
import com.robotrader.spring.model.Ticker;
import com.robotrader.spring.service.interfaces.INewsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NewsService implements INewsService {
    private final WebClient polygonWebClient;
    private static final String ENDPOINT_PATH = "/v2/reference/news";
    private final TickerService tickerService;
    private static final Logger logger = LoggerFactory.getLogger(NewsService.class);

    @Autowired
    public NewsService(WebClient polygonWebClient, TickerService tickerService) {
        this.polygonWebClient = polygonWebClient;
        this.tickerService = tickerService;
    }

    public Flux<TickerNewsDTO> getNewsByTicker(String ticker) {
        String path = ENDPOINT_PATH;

        Mono<TickerNewsApiResponseDTO> dataStream = polygonWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(path)
                        .queryParam("ticker", ticker)
                        .queryParam("limit", 10)
                        .build()
                )
                .retrieve()
                .onStatus(status -> status.is4xxClientError(), response -> {
                    logger.error("4xx error occurred for ticker: {}", ticker);
                    return Mono.error(new RuntimeException("4xx error"));
                })
                .onStatus(status -> status.is5xxServerError(), response -> {
                    logger.error("5xx error occurred for ticker: {}", ticker);
                    return Mono.error(new RuntimeException("5xx error"));
                })
                .bodyToMono(TickerNewsApiResponseDTO.class)
                .doOnNext(response -> logger.debug("API Response: {}", response))
                .doOnError(error -> logger.error("Error in API call: {}", error.getMessage()));

        return dataStream
                .flatMapMany(response -> {
                    if (response.getResults().isEmpty()) {
                        logger.warn("No news found for ticker: {}", ticker);
                        return Flux.empty();
                    }
                    return Flux.fromIterable(response.getResults());
                })
                .switchIfEmpty(Flux.defer(() -> {
                    logger.warn("No results found in the API response for ticker: {}", ticker);
                    return Flux.empty();
                }))
                .onErrorResume(error -> {
                    logger.error("Error fetching News for ticker {}: {}", ticker, error.getMessage());
                    return Flux.empty();
                });
    }

    @Override
    public Mono<List<TickerNewsDTO>> getAllNews() {
        List<String> tickers = tickerService.getAllTickers()
                .stream()
                .map(Ticker::getTickerName)
                .collect(Collectors.toList());

        return Flux.fromIterable(tickers)
                .flatMap(this::getNewsByTicker)
                .collectList()
                .doOnSuccess(newsList -> logger.info("Collected news for {} tickers", tickers.size()))
                .doOnError(error -> logger.error("Error collecting news for all tickers: {}", error.getMessage()));
    }
}
