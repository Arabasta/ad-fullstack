package com.robotrader.spring.controller.backtest;

import com.robotrader.spring.dto.backtest.AlgorithmDTO;
import com.robotrader.spring.dto.chart.ChartDataDTO;
import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.ChartService;
import com.robotrader.spring.service.TickerService;
import com.robotrader.spring.trading.service.TradingApplicationService;
import com.robotrader.spring.trading.dto.BackTestResultDTO;
import com.robotrader.spring.trading.service.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/backtest")
public class BackTestControllerV1 {
    private final TradingApplicationService tradingApplicationService;
    private final TickerService tickerService;
    private final ChartService chartService;

    @Autowired
    public BackTestControllerV1(TradingApplicationService tradingApplicationService, TickerService tickerService, ChartService chartService) {
        this.tradingApplicationService = tradingApplicationService;
        this.tickerService = tickerService;
        this.chartService = chartService;
    }

    @GetMapping("/view")
    public ResponseEntity<ApiResponse<AlgorithmDTO>> getTradingAlgorithms() {
        AlgorithmDTO responseDTO = new AlgorithmDTO();
        responseDTO.setAlgorithms(tradingApplicationService.getAlgorithms());
        responseDTO.setPortfolioTypes(PortfolioTypeEnum.values());
        responseDTO.setTickerList(tickerService.getAllTickers());
        return ResponseEntity.ok(new ApiResponse<>("success", "Algorithm list retrieved successfully", responseDTO));
    }

    @GetMapping("/{portfolioType}")
    public ResponseEntity<ApiResponse<ChartDataDTO>> getTradingBackTestResults(@PathVariable PortfolioTypeEnum portfolioType,
                                                                               @RequestParam(required = false) String ticker,
                                                                               @RequestParam int amount,
                                                                               @RequestParam String algorithmType) {
        List<String> tickers = new ArrayList<>();
        if (ticker == null || ticker.isEmpty()){
             tickers = tickerService.getTickerByPortfolioType(portfolioType);
        } else {
            tickers.add(ticker);
        }

        BackTestResultDTO tradeResults = tradingApplicationService.runTradingAlgorithmBackTest(tickers, portfolioType, algorithmType);
        ChartDataDTO responseDTO = chartService.transformBackTestDTOtoChartDataDTO(tradeResults, amount);
        return ResponseEntity.ok(new ApiResponse<>("success", "Back test results retrieved successfully", responseDTO));
    }

}
