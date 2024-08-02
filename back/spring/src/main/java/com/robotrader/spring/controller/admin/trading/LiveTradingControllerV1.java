package com.robotrader.spring.controller.admin.trading;

import com.robotrader.spring.dto.backtest.AlgorithmDTO;
import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.Ticker;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.enums.TickerTypeEnum;
import com.robotrader.spring.service.TickerService;
import com.robotrader.spring.trading.application.TradingApplicationService;
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

    @Autowired
    public LiveTradingControllerV1(TickerService tickerService, TradingApplicationService tradingApplicationService) {
        this.tickerService = tickerService;
        this.tradingApplicationService = tradingApplicationService;
    }

    @GetMapping("/start")
    public ResponseEntity<ApiResponse<?>> viewLiveTrading(@RequestParam PortfolioTypeEnum portfolioType,
                                                         @RequestParam TickerTypeEnum tickerType) {
        List<String> tickerList = null;
        switch(tickerType) {
            case STOCKS -> tickerList = tickerService.getAllStockTickerName();
            case CRYPTO -> tickerList = tickerService.getAllCrytpoTickerName();
        }
        tradingApplicationService.runTradingAlgorithmLive(tickerList, portfolioType, tickerType);
        return ResponseEntity.ok(new ApiResponse<>("success", "Live trading started successfully", null));
    }


}
