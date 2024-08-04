package com.robotrader.spring.controller.admin.trading;

import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.ticker.TickerDTOListDTO;
import com.robotrader.spring.trading.dto.PredictionDTOListDTO;
import com.robotrader.spring.trading.service.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("predict")
    public ResponseEntity<ApiResponse<PredictionDTOListDTO>> predict(@RequestBody TickerDTOListDTO tickerDTOListDTO) throws IOException {
        PredictionDTOListDTO predictionDTOListDTO = predictionService.byTickerList(tickerDTOListDTO);
        return ResponseEntity.ok(new ApiResponse<>("success", "Predicted TickerDTOs successfully", predictionDTOListDTO));
    }

}
