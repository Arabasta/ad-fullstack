package com.robotrader.spring.controller.admin.trading;

import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.ticker.TickerDTO;
import com.robotrader.spring.dto.ticker.TickerDTOListDTO;
import com.robotrader.spring.dto.ticker.TickerListDTO;
import com.robotrader.spring.model.Ticker;
import com.robotrader.spring.service.TickerService;
import com.robotrader.spring.trading.service.MarketDataService;
import com.robotrader.spring.trading.service.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/trading/tickers")
public class ManageTickerControllerV1 {
    private final TickerService tickerService;
    private final MarketDataService marketDataService;
    private final PredictionService predictionService;

    @Autowired
    public ManageTickerControllerV1(TickerService tickerService, MarketDataService marketDataService, PredictionService predictionService) {
        this.tickerService = tickerService;
        this.marketDataService = marketDataService;
        this.predictionService = predictionService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<TickerListDTO>> getActiveTickers() {
        List<Ticker> tickerList = tickerService.getAllTickers();
        TickerListDTO tickerListDTO = new TickerListDTO();
        tickerListDTO.setTickerList(tickerList);
        return ResponseEntity.ok(new ApiResponse<>("success", "Active ticker list retrieved successfully", tickerListDTO));
    }

    @GetMapping("/available")
    public ResponseEntity<ApiResponse<TickerDTOListDTO>> getTickersWithPredictions() {
        TickerDTOListDTO tickerDTOListDTO = predictionService.getAvailableTickers();
        return ResponseEntity.ok(new ApiResponse<>("success", "Available tickers list retrieved successfully", tickerDTOListDTO));
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
