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
        TickerListDTO responseDTO = new TickerListDTO();
        responseDTO.setTickerList(tickerList);
        return ResponseEntity.ok(new ApiResponse<>("success", "Active ticker list retrieved successfully", responseDTO));
    }

    @GetMapping("/available")
    public ResponseEntity<ApiResponse<TickerDTOListDTO>> getTickersWithPredictions() {
        TickerDTOListDTO responseDTO = predictionService.getAvailableTickers();
        return ResponseEntity.ok(new ApiResponse<>("success", "Available tickers list retrieved successfully", responseDTO));
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<TickerDTO>> createTicker(@RequestBody TickerDTO responseDTO) {
        tickerService.create(responseDTO);
        return ResponseEntity.ok(new ApiResponse<>("success", "Ticker created successfully", responseDTO));
    }

    @DeleteMapping("/{ticker}")
    public ResponseEntity<ApiResponse<?>> deleteTicker(@PathVariable String ticker) {
        tickerService.deleteTicker(ticker);
        return ResponseEntity.ok(new ApiResponse<>("success", "Ticker deleted successfully", null));
    }
}
