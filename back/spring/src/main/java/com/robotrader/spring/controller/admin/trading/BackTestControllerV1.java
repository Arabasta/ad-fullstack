package com.robotrader.spring.controller.admin.trading;

import com.robotrader.spring.dto.backtest.AlgorithmDTO;
import com.robotrader.spring.dto.chart.ChartDataDTO;
import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.ChartService;
import com.robotrader.spring.service.TickerService;
import com.robotrader.spring.trading.application.TradingApplicationService;
import com.robotrader.spring.trading.dto.BackTestResultDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/trading/backtest")
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
        responseDTO.setAlgorithms(tradingApplicationService.getAlgorithmList());
        responseDTO.setPortfolioTypes(PortfolioTypeEnum.values());
        responseDTO.setTickerList(tickerService.getAllTickers());
        return ResponseEntity.ok(new ApiResponse<>("success", "Algorithm list retrieved successfully", responseDTO));
    }

    @GetMapping("/{ticker}")
    public ResponseEntity<ApiResponse<ChartDataDTO>> getTradingBackTestResults(@PathVariable String ticker,
                                                                               @RequestParam PortfolioTypeEnum portfolioType) {

        BackTestResultDTO tradeResults = tradingApplicationService.runTradingAlgorithmBackTest(ticker, portfolioType);
        ChartDataDTO responseDTO = chartService.transformBackTestDTOtoChartDataDTO(tradeResults);
        return ResponseEntity.ok(new ApiResponse<>("success", "Back test results retrieved successfully", responseDTO));
    }
}
