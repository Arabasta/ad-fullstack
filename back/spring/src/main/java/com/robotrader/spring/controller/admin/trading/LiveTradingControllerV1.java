package com.robotrader.spring.controller.admin.trading;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.robotrader.spring.aws.s3.S3TransactionLogger;
import com.robotrader.spring.dto.general.ApiErrorResponse;
import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.enums.TickerTypeEnum;
import com.robotrader.spring.service.TickerService;
import com.robotrader.spring.trading.service.TradingApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/trading/livetrading")
public class LiveTradingControllerV1 {
    private final TickerService tickerService;
    private final TradingApplicationService tradingApplicationService;
    private final S3TransactionLogger s3TransactionLogger;

    @Autowired
    public LiveTradingControllerV1(TickerService tickerService, TradingApplicationService tradingApplicationService, S3TransactionLogger s3TransactionLogger) {
        this.tickerService = tickerService;
        this.tradingApplicationService = tradingApplicationService;
        this.s3TransactionLogger = s3TransactionLogger;
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
    public ResponseEntity<?> viewTradeTransactions(@RequestParam PortfolioTypeEnum portfolioType,
                                                   @RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "10") int size) {
        if (s3TransactionLogger == null) {
            ApiErrorResponse response = new ApiErrorResponse("error",
                    "S3 Transaction Logging is disabled or not configured.",
                    "S3TransactionLogger bean is not available.");
            return ResponseEntity.status(503).body(response);
        }
        List<ObjectNode> transactions = s3TransactionLogger.getTradeTransactionsWithPagination(portfolioType, page, size);
        return ResponseEntity.ok(new ApiResponse<>("success", "Transactions retrieved successfully", transactions));
    }
}
