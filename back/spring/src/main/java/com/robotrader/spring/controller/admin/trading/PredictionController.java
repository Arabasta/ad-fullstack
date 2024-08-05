package com.robotrader.spring.controller.admin.trading;

import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.ticker.TickerDTO;
import com.robotrader.spring.dto.ticker.TickerDTOListDTO;
import com.robotrader.spring.trading.dto.PredictionDTO;
import com.robotrader.spring.trading.dto.PredictionDTOListDTO;
import com.robotrader.spring.trading.service.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

//todo: /prediction/ paths used for API debugging. delete before submission if not needed.
@RestController
@RequestMapping("/api/v1/admin/prediction")
public class PredictionController {

    private final PredictionService predictionService;

    @Autowired
    public PredictionController(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @GetMapping("available")
    public ResponseEntity<ApiResponse<TickerDTOListDTO>> getAvailableTickers() {
        TickerDTOListDTO tickerDTOListDTO = predictionService.getAvailableTickers();
        return ResponseEntity.ok(new ApiResponse<>("success", "Available predicted TickerDTOs retrieved successfully", tickerDTOListDTO));
    }

    @PostMapping("ticker/backtest")
    public ResponseEntity<ApiResponse<PredictionDTO>> predict(@RequestBody PredictionDTO predictionDTO) throws IOException {
        PredictionDTO predictionDtoResults = predictionService.byPredictionDtoBacktest(predictionDTO).block();
        return ResponseEntity.ok(new ApiResponse<>("success", "Predicted backtest data successfully", predictionDtoResults));
    }

    @PostMapping("ticker/live")
    public ResponseEntity<ApiResponse<PredictionDTO>> predict(@RequestBody TickerDTO tickerDTO) throws IOException {
        PredictionDTO predictionDTO = predictionService.byTickerDtoLive(tickerDTO).block();
        return ResponseEntity.ok(new ApiResponse<>("success", "Predicted TickerDTO successfully", predictionDTO));
    }

//    // todo: not tested. to see if needed.
//    @PostMapping("ticker_list/live")
//    public ResponseEntity<ApiResponse<PredictionDTOListDTO>> predict(@RequestBody TickerDTOListDTO tickerDTOListDTO) throws IOException {
//        PredictionDTOListDTO predictionDTOListDTO = predictionService.byTickerDtoListDtoLive(tickerDTOListDTO);
//        return ResponseEntity.ok(new ApiResponse<>("success", "Predicted TickerDTOList successfully", predictionDTOListDTO));
//    }
}
