package com.robotrader.spring.controller.customer;


import com.robotrader.spring.aws.s3.S3TransactionLogger;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import org.springframework.beans.factory.annotation.Autowired;
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
    public TransactionControllerV1(S3TransactionLogger s3TransactionLogger) {
        this.s3TransactionLogger = s3TransactionLogger;
    }

    @GetMapping("/wallet/{count}")
    public List<String> getWalletTransactions(Authentication authentication, @PathVariable int count) {
        String username = authentication.getName();
        return s3TransactionLogger.getWalletTransactions(username, count);
    }

    @GetMapping("/portfolio/{portfolioType}/{count}")
    public List<String> getPortfolioTransactions(Authentication authentication, @PathVariable PortfolioTypeEnum portfolioType,
                                                 @PathVariable int count) {
        String username = authentication.getName();
        return s3TransactionLogger.getPortfolioTransactions(username, portfolioType, count);
    }
}
