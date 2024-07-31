package com.robotrader.spring.controller.customer;


import com.fasterxml.jackson.databind.node.ObjectNode;
import com.robotrader.spring.aws.s3.S3TransactionLogger;
import com.robotrader.spring.dto.general.ApiErrorResponse;
import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/transaction")
public class TransactionControllerV1 {

    private final S3TransactionLogger s3TransactionLogger;

    @Autowired
    public TransactionControllerV1(@Autowired(required = false) S3TransactionLogger s3TransactionLogger) {
        this.s3TransactionLogger = s3TransactionLogger;
    }

    @GetMapping("/wallet/{count}")
    public ResponseEntity<?> getWalletTransactions(Authentication authentication, @PathVariable int count) {
        if (s3TransactionLogger == null) {
            ApiErrorResponse response = new ApiErrorResponse("error", "S3 Transaction Logging is disabled or not configured.",
                    "S3TransactionLogger bean is not available.");
            return ResponseEntity.status(503).body(response);
        }
        String username = authentication.getName();
        List<ObjectNode> transactions = s3TransactionLogger.getWalletTransactions(username, count);
        ApiResponse<List<ObjectNode>> apiResponse = new ApiResponse<>("success", "Transactions retrieved successfully", transactions);
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/portfolio/{portfolioType}/{count}")
    public ResponseEntity<?> getPortfolioTransactions(Authentication authentication, @PathVariable PortfolioTypeEnum portfolioType,
                                                      @PathVariable int count) {
        if (s3TransactionLogger == null) {
            ApiErrorResponse response = new ApiErrorResponse("error", "S3 Transaction Logging is disabled or not configured.",
                    "S3TransactionLogger bean is not available.");
            return ResponseEntity.status(503).body(response);
        }
        String username = authentication.getName();
        List<ObjectNode> transactions = s3TransactionLogger.getPortfolioTransactions(username, portfolioType, count);
        ApiResponse<List<ObjectNode>> apiResponse = new ApiResponse<>("success", "Transactions retrieved successfully", transactions);
        return ResponseEntity.ok(apiResponse);
    }
}
