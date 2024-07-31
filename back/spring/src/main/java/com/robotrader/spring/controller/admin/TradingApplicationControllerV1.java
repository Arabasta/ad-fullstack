package com.robotrader.spring.controller.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.robotrader.spring.dto.chart.ChartDataDTO;
import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.ChartService;
import com.robotrader.spring.service.TickerService;
import com.robotrader.spring.trading.application.TradingApplicationService;
import com.robotrader.spring.trading.dto.BackTestResultDTO;
import com.robotrader.spring.trading.service.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/trading")
public class TradingApplicationControllerV1 {
    private final TradingApplicationService tradingApplicationService;
    private final TickerService tickerService;
    private final ChartService chartService;
    private final PredictionService predictionService;

    @Autowired
    public TradingApplicationControllerV1(TradingApplicationService tradingApplicationService, TickerService tickerService, ChartService chartService, PredictionService predictionService) {
        this.tradingApplicationService = tradingApplicationService;
        this.tickerService = tickerService;
        this.chartService = chartService;
        this.predictionService = predictionService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<String>>> getTradingAlgorithms() {
        List<String> algorithmList = tradingApplicationService.getAlgorithmList();
        return ResponseEntity.ok(new ApiResponse<>("success", "Algorithm list retrieved successfully", algorithmList));
    }

    @GetMapping("backtest")
    public ResponseEntity<ApiResponse<ChartDataDTO>> getTradingBackTestResults(@RequestParam String ticker,
                                                                               @RequestParam PortfolioTypeEnum portfolioType) {

        BackTestResultDTO tradeResults = tradingApplicationService.runTradingAlgorithmBackTest(ticker, portfolioType);
        ChartDataDTO chartDataDTO = chartService.transformBackTestDTOtoChartDataDTO(tradeResults);
        return ResponseEntity.ok(new ApiResponse<>("success", "Back test results retrieved successfully", chartDataDTO));
    }

    @GetMapping("prediction")
    public ResponseEntity<ApiResponse<ObjectMapper>> getPredictions(@RequestParam String ticker) throws IOException {
        ObjectMapper predictionObjectMapper = predictionService.byStock(ticker);
        if (predictionObjectMapper == null) {
            return ResponseEntity.ok(new ApiResponse<>("fail", "Prediction retrieval failed.", null));
        }
        return ResponseEntity.ok(new ApiResponse<>("success", "Prediction retrieved successfully", predictionObjectMapper));
    }
}
