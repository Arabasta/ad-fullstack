package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.ticker.TickerNewsDTO;
import reactor.core.publisher.Mono;

import java.util.List;

public interface INewsService {
    Mono<List<TickerNewsDTO>> getAllNews();
}
