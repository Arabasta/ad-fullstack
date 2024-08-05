package com.robotrader.spring.controller.customer.log;

import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.portfolio.PortfolioTransactionLogDTO;
import com.robotrader.spring.dto.wallet.WalletTransactionLogDTO;
import com.robotrader.spring.service.log.PortfolioTransactionLogService;
import com.robotrader.spring.service.log.WalletTransactionLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/customer/log/sql")
public class SqlTransactionLogControllerV1 {

    private final WalletTransactionLogService walletTransactionLogService;
    private final PortfolioTransactionLogService portfolioTransactionLogService;

    @Autowired
    public SqlTransactionLogControllerV1(WalletTransactionLogService walletTransactionLogService,
                                    PortfolioTransactionLogService portfolioTransactionLogService) {
        this.walletTransactionLogService = walletTransactionLogService;
        this.portfolioTransactionLogService = portfolioTransactionLogService;
    }

    @GetMapping("/wallet")
    public ResponseEntity<ApiResponse<Page<WalletTransactionLogDTO>>> getWalletTransactionLogs(Authentication authentication, Pageable pageable) {
        String username = authentication.getName();
        Page<WalletTransactionLogDTO> logs = walletTransactionLogService.getWalletTransactionLogs(username, pageable);
        return ResponseEntity.ok(new ApiResponse<>("success", "Wallet transaction logs retrieved successfully", logs));
    }

    @GetMapping("/portfolio")
    public ResponseEntity<ApiResponse<Page<PortfolioTransactionLogDTO>>> getPortfolioTransactionLogs(Authentication authentication, Pageable pageable) {
        String username = authentication.getName();
        Page<PortfolioTransactionLogDTO> logs = portfolioTransactionLogService.getPortfolioTransactionLogs(username, pageable);
        return ResponseEntity.ok(new ApiResponse<>("success", "Portfolio transaction logs retrieved successfully", logs));
    }
}

