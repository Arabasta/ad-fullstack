package com.robotrader.spring.controller.admin.trading;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.robotrader.spring.aws.s3.S3TransactionLogger;
import com.robotrader.spring.dto.general.ApiErrorResponse;
import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.livetrade.TradeTransactionLogDTO;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.enums.TickerTypeEnum;
import com.robotrader.spring.service.TickerService;
import com.robotrader.spring.service.log.TradeTransactionLogService;
import com.robotrader.spring.trading.service.TradingApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin/trading/livetrading")
public class LiveTradingControllerV1 {
    private final TickerService tickerService;
    private final TradingApplicationService tradingApplicationService;
    private final TradeTransactionLogService tradeTransactionLogService;

    @Autowired
    public LiveTradingControllerV1(TickerService tickerService, TradingApplicationService tradingApplicationService, TradeTransactionLogService tradeTransactionLogService) {
        this.tickerService = tickerService;
        this.tradingApplicationService = tradingApplicationService;
        this.tradeTransactionLogService = tradeTransactionLogService;
    }

    @GetMapping("/start")
    public ResponseEntity<ApiResponse<?>> startLiveTrading(@RequestParam PortfolioTypeEnum portfolioType,
                                                          @RequestParam TickerTypeEnum tickerType) {
        List<String> tickerList = null;
        switch(tickerType) {
            case STOCKS -> tickerList = tickerService.getAllStockTickerName();
            case CRYPTO -> tickerList = tickerService.getAllCrytpoTickerName();
        }
        tradingApplicationService.runTradingAlgorithmLive(tickerList, portfolioType, tickerType);
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
}
