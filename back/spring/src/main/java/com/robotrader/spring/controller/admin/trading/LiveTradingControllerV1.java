package com.robotrader.spring.controller.admin.trading;

import com.robotrader.spring.dto.backtest.AlgorithmDTO;
import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.livetrade.LiveTradeStatusDTO;
import com.robotrader.spring.dto.livetrade.TradeTransactionLogDTO;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.TickerService;
import com.robotrader.spring.service.log.TradeTransactionLogService;
import com.robotrader.spring.trading.service.LiveMarketDataService;
import com.robotrader.spring.trading.service.TradingApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/trading/livetrading")
public class LiveTradingControllerV1 {
    private final TickerService tickerService;
    private final TradingApplicationService tradingApplicationService;
    private final TradeTransactionLogService tradeTransactionLogService;
    private final LiveMarketDataService liveMarketDataService;

    @Autowired
    public LiveTradingControllerV1(TickerService tickerService, TradingApplicationService tradingApplicationService, TradeTransactionLogService tradeTransactionLogService, LiveMarketDataService liveMarketDataService) {
        this.tickerService = tickerService;
        this.tradingApplicationService = tradingApplicationService;
        this.tradeTransactionLogService = tradeTransactionLogService;
        this.liveMarketDataService = liveMarketDataService;
    }

    @GetMapping("/view")
    public ResponseEntity<ApiResponse<AlgorithmDTO>> getTradingAlgorithms() {
        AlgorithmDTO responseDTO = new AlgorithmDTO();
        responseDTO.setAlgorithms(tradingApplicationService.getAlgorithms());
        responseDTO.setPortfolioTypes(PortfolioTypeEnum.values());
        responseDTO.setTickerList(tickerService.getAllTickers());
        return ResponseEntity.ok(new ApiResponse<>("success", "Algorithm list retrieved successfully", responseDTO));
    }

    @GetMapping("/start")
    public ResponseEntity<ApiResponse<?>> startLiveTrading(@RequestParam String algorithmType) {
        tradingApplicationService.runTradingAlgorithmLive(algorithmType);
        return ResponseEntity.ok(new ApiResponse<>("success", "Live trading started successfully", null));
    }

    @GetMapping("/stop")
    public ResponseEntity<ApiResponse<?>> stopLiveTrading() {
        tradingApplicationService.stopTradingAlgorithmLive();
        return ResponseEntity.ok(new ApiResponse<>("success", "Live trading stopped successfully", null));
    }

    @GetMapping("/transactions")
    public ResponseEntity<ApiResponse<Page<TradeTransactionLogDTO>>> getTradeTransactionsLogs(Pageable pageable) {
        Page<TradeTransactionLogDTO> logs = tradeTransactionLogService.getTradeTransactionLogs(pageable);
        return ResponseEntity.ok(new ApiResponse<>("success", "Trade transaction logs retrieved successfully", logs));
    }

    @GetMapping("/status")
    public ResponseEntity<ApiResponse<LiveTradeStatusDTO>> getLiveTradingStatus() {
        LiveTradeStatusDTO responseDTO = new LiveTradeStatusDTO();
        responseDTO.setStatus(liveMarketDataService.isRunning());
        return ResponseEntity.ok(new ApiResponse<>("success", "Live trading status retrieved successfully", responseDTO));
    }
}
