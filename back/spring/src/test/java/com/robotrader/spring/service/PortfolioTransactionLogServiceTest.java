package com.robotrader.spring.service;

import com.robotrader.spring.dto.portfolio.PortfolioTransactionLogDTO;
import com.robotrader.spring.model.User;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.log.PortfolioTransactionLog;
import com.robotrader.spring.repository.log.PortfolioTransactionLogRepository;
import com.robotrader.spring.service.log.PortfolioTransactionLogService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class PortfolioTransactionLogServiceTest {

    @Mock
    private PortfolioTransactionLogRepository portfolioTransactionLogRepository;

    @Mock
    private UserService userService;

    private PortfolioTransactionLogService portfolioTransactionLogService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        portfolioTransactionLogService = new PortfolioTransactionLogService(portfolioTransactionLogRepository, userService);
    }

    @Test
    void testLog_Success() {
        User user = new User();
        user.setUsername("user");

        PortfolioTransactionLog logEntry = new PortfolioTransactionLog();
        logEntry.setTimestamp(LocalDateTime.now());
        logEntry.setUser(user);
        logEntry.setPortfolioType(PortfolioTypeEnum.MODERATE);
        logEntry.setTransactionType("TestTransaction");
        logEntry.setTransactionAmount(BigDecimal.valueOf(500));
        logEntry.setTotalAmount(BigDecimal.valueOf(1000));

        portfolioTransactionLogService.log(user, PortfolioTypeEnum.MODERATE, "TestTransaction", BigDecimal.valueOf(500), BigDecimal.valueOf(1000));

        verify(portfolioTransactionLogRepository, times(1)).save(any(PortfolioTransactionLog.class));
    }

    @Test
    void testGetPortfolioTransactionLogs_Success() {
        User user = new User();
        user.setUsername("user");

        PortfolioTransactionLog log1 = new PortfolioTransactionLog();
        log1.setId(1L);
        log1.setTimestamp(LocalDateTime.now());
        log1.setPortfolioType(PortfolioTypeEnum.MODERATE);
        log1.setTransactionType("Transaction1");
        log1.setTransactionAmount(BigDecimal.valueOf(500));
        log1.setTotalAmount(BigDecimal.valueOf(1000));

        PortfolioTransactionLog log2 = new PortfolioTransactionLog();
        log2.setId(2L);
        log2.setTimestamp(LocalDateTime.now().minusDays(1));
        log2.setPortfolioType(PortfolioTypeEnum.MODERATE);
        log2.setTransactionType("Transaction2");
        log2.setTransactionAmount(BigDecimal.valueOf(600));
        log2.setTotalAmount(BigDecimal.valueOf(1100));

        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "id"));
        when(userService.getUserByUsername("user")).thenReturn(user);
        when(portfolioTransactionLogRepository.findByUser(user, pageable)).thenReturn(new PageImpl<>(List.of(log1, log2)));

        Page<PortfolioTransactionLogDTO> result = portfolioTransactionLogService.getPortfolioTransactionLogs("user", pageable);

        assertEquals(2, result.getContent().size());
        assertEquals("Transaction1", result.getContent().get(0).getTransactionType());
        assertEquals("Transaction2", result.getContent().get(1).getTransactionType());
    }
}
