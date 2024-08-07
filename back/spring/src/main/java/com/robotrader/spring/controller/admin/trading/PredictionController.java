package com.robotrader.spring.controller.admin.trading;

import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.ticker.TickerDTO;
import com.robotrader.spring.dto.ticker.TickerDTOListDTO;
import com.robotrader.spring.trading.dto.PredictionDTO;
import com.robotrader.spring.trading.service.PredictionService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.scheduler.Schedulers;

import java.io.IOException;

/*
 * todo: Note: PredictionController is used for API debugging. delete before submission if not needed.
 */

@RestController
@RequestMapping("/api/v1/admin/prediction")
public class PredictionController {

    private final PredictionService predictionService;
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(PredictionController.class);

    @Autowired
    public PredictionController(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @GetMapping("available")
    public ResponseEntity<ApiResponse<TickerDTOListDTO>> getAvailableTickers() {
        TickerDTOListDTO tickerDTOListDTO = predictionService.getAvailableTickers();
        return ResponseEntity.ok(new ApiResponse<>("success", "Available TickerDTOs for predictions retrieved successfully", tickerDTOListDTO));
    }

    @PostMapping("ticker/backtest")
    public ResponseEntity<ApiResponse<PredictionDTO>> predict(@RequestBody PredictionDTO predictionDTO) throws IOException {
        PredictionDTO predictionDtoResults = predictionService.byPredictionDtoBacktest(predictionDTO)
                .subscribeOn(Schedulers.boundedElastic())
                .doOnError(error -> logger.error("Error fetching backtest predictions: {}{}", error.getMessage(), predictionDTO))
                .block();
        return ResponseEntity.ok(new ApiResponse<>("success", "Predicted backtest data successfully", predictionDtoResults));
    }

    @PostMapping("ticker/live")
    public ResponseEntity<ApiResponse<PredictionDTO>> predict(@RequestBody TickerDTO tickerDTO) throws IOException {
        PredictionDTO predictionDTO = predictionService.byTickerDtoLive(tickerDTO)
                .subscribeOn(Schedulers.boundedElastic())
                .doOnError(error -> logger.error("Error fetching live predictions: {}{}", error.getMessage(), tickerDTO))
                .block();
        return ResponseEntity.ok(new ApiResponse<>("success", "Predicted TickerDTO successfully", predictionDTO));
    }
}
