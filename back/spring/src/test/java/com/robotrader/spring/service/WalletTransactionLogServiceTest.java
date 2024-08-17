package com.robotrader.spring.service;

import com.robotrader.spring.model.User;
import com.robotrader.spring.model.log.WalletTransactionLog;
import com.robotrader.spring.repository.log.WalletTransactionLogRepository;
import com.robotrader.spring.service.log.WalletTransactionLogService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.mockito.Mockito.*;

class WalletTransactionLogServiceTest {

    @Mock
    private WalletTransactionLogRepository walletTransactionLogRepository;

    @Mock
    private UserService userService;

    private WalletTransactionLogService walletTransactionLogService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        walletTransactionLogService = new WalletTransactionLogService(walletTransactionLogRepository, userService);
    }

    @Test
    void testLog_Success() {
        User user = new User();
        user.setUsername("user");

        WalletTransactionLog logEntry = new WalletTransactionLog();
        logEntry.setTimestamp(LocalDateTime.now());
        logEntry.setUser(user);
        logEntry.setTransactionAmount(BigDecimal.valueOf(500));
        logEntry.setTotalAmount(BigDecimal.valueOf(1000));
        logEntry.setTransactionType("Deposit");

        walletTransactionLogService.log(user, BigDecimal.valueOf(500), BigDecimal.valueOf(1000), "Deposit");

        verify(walletTransactionLogRepository, times(1)).save(any(WalletTransactionLog.class));
    }
}
