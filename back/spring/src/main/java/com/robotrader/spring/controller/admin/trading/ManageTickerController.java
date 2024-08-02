package com.robotrader.spring.controller.admin.trading;

import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.ticker.TickerDTO;
import com.robotrader.spring.dto.ticker.TickerDataListDTO;
import com.robotrader.spring.dto.ticker.TickerListDTO;
import com.robotrader.spring.model.Ticker;
import com.robotrader.spring.service.TickerService;
import com.robotrader.spring.trading.service.MarketDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/trading/tickers")
public class ManageTickerController {
    private final TickerService tickerService;
    private final MarketDataService marketDataService;

    @Autowired
    public ManageTickerController(TickerService tickerService, MarketDataService marketDataService) {
        this.tickerService = tickerService;
        this.marketDataService = marketDataService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<TickerListDTO>> getAllTickers() {
        List<Ticker> tickerList = tickerService.getAllTickers();
        TickerListDTO tickerListDTO = new TickerListDTO();
        tickerListDTO.setTickerList(tickerList);
        return ResponseEntity.ok(new ApiResponse<>("success", "Ticker list retrieved successfully", tickerListDTO));
    }

    @GetMapping("/available")
    public Mono<ResponseEntity<ApiResponse<TickerDataListDTO>>> getAvailableTickers() {
        // return list of TickerDTO from API call
        return marketDataService.getTickerDataByTicker("")
                .map(tickerDataDTOList -> {
                    TickerDataListDTO tickerDataListDTO = new TickerDataListDTO();
                    tickerDataListDTO.setTickerDataList(tickerDataDTOList);
                    return ResponseEntity.ok(new ApiResponse<>("success", "Available tickers retrieved successfully", tickerDataListDTO));
                });
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<TickerDTO>> createTicker(@RequestBody TickerDTO tickerDTO) {
        tickerService.create(tickerDTO);
        return ResponseEntity.ok(new ApiResponse<>("success", "Ticker created successfully", tickerDTO));
    }

    @DeleteMapping("/{ticker}")
    public ResponseEntity<ApiResponse<TickerDTO>> deleteTicker(@PathVariable String ticker) {
        tickerService.deleteTicker(ticker);
        return ResponseEntity.ok(new ApiResponse<>("success", "Ticker deleted successfully", null));
    }
}
