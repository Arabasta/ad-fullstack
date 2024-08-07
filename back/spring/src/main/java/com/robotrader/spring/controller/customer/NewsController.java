package com.robotrader.spring.controller.customer;

import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.portfolio.PortfolioBalanceDTO;
import com.robotrader.spring.dto.ticker.TickerNewsDTO;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.interfaces.INewsService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customer/news")
public class NewsController {
    private final INewsService newsService;

    public NewsController(INewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping
    public Mono<ResponseEntity<ApiResponse<List<TickerNewsDTO>>>> getAllNews() {
        return newsService.getAllNews()
                .map(newsList -> ResponseEntity.ok(new ApiResponse<>("success", "News retrieved successfully", newsList)))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
