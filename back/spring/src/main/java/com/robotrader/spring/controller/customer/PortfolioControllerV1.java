package com.robotrader.spring.controller.customer;

import com.robotrader.spring.dto.chart.ChartDataDTO;
import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.portfolio.PortfolioAllocateFundsDTO;
import com.robotrader.spring.dto.portfolio.PortfolioBalanceDTO;
import com.robotrader.spring.dto.portfolio.PortfolioTransactionResponseDTO;
import com.robotrader.spring.dto.portfolio.PortfolioWithdrawFundsDTO;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.log.PortfolioHistoryLog;
import com.robotrader.spring.service.interfaces.IChartService;
import com.robotrader.spring.service.interfaces.IPortfolioService;
import com.robotrader.spring.service.log.PortfolioHistoryLogService;
import com.robotrader.spring.trading.dto.BackTestResultDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customer/portfolio")
public class PortfolioControllerV1 {

    private final IPortfolioService portfolioService;
    private final PortfolioHistoryLogService portfolioHistoryLogService;
    private final IChartService chartService;

    @Autowired
    public PortfolioControllerV1(IPortfolioService portfolioService, PortfolioHistoryLogService portfolioHistoryLogService, IChartService chartService) {
        this.portfolioService = portfolioService;
        this.portfolioHistoryLogService = portfolioHistoryLogService;
        this.chartService = chartService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PortfolioBalanceDTO>> getPortfolioBalance(Authentication authentication,
                                                                                @Valid @RequestParam PortfolioTypeEnum portfolioType) {
        String username = authentication.getName();
        PortfolioBalanceDTO portfolioBalanceDTO = portfolioService.getPortfolioDTOByUsernameAndType(username, portfolioType);
        return ResponseEntity.ok(new ApiResponse<>("success", "Portfolio balance retrieved successfully", portfolioBalanceDTO));
    }

    @PostMapping("/add-funds")
    public ResponseEntity<ApiResponse<PortfolioTransactionResponseDTO>> addFunds(Authentication authentication,
                                                                           @Valid @RequestBody PortfolioAllocateFundsDTO portfolioAllocateFundsDTO) {
        String username = authentication.getName();
        PortfolioTransactionResponseDTO responseDTO = portfolioService.allocateFundsToPortfolio(username, portfolioAllocateFundsDTO);
        return ResponseEntity.ok(new ApiResponse<>("success", "Funds added successfully", responseDTO));
    }

    @PostMapping("/withdraw-funds")
    public ResponseEntity<ApiResponse<PortfolioTransactionResponseDTO>> withdrawFunds(Authentication authentication,
                                                                                @Valid @RequestBody PortfolioWithdrawFundsDTO portfolioWithdrawFundsDTO) {
        String username = authentication.getName();
        PortfolioTransactionResponseDTO responseDTO = portfolioService.withdrawFundsFromPortfolio(username, portfolioWithdrawFundsDTO);
        return ResponseEntity.ok(new ApiResponse<>("success", "Funds withdrawn successfully", responseDTO));
    }

    @GetMapping("/chart")
    public ResponseEntity<ApiResponse<ChartDataDTO>> getPortfolioChart(Authentication authentication, @RequestParam PortfolioTypeEnum portfolioType) {
        String username = authentication.getName();
        List<PortfolioHistoryLog> portfolioHistoryLogs = portfolioHistoryLogService.getPortfolioHistoryLog(username, portfolioType);
        ChartDataDTO responseDTO = chartService.transformPortfolioHistoryLogtoChartDataDTO(portfolioHistoryLogs);
        return ResponseEntity.ok(new ApiResponse<>("success", "Portfolio chart data retrieved successfully", responseDTO));
    }
}
