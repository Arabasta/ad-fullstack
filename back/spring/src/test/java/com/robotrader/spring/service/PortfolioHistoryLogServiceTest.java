package com.robotrader.spring.service;

import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.log.PortfolioHistoryLog;
import com.robotrader.spring.repository.log.PortfolioHistoryLogRepository;
import com.robotrader.spring.service.log.PortfolioHistoryLogService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

class PortfolioHistoryLogServiceTest {

    @Mock
    private PortfolioHistoryLogRepository portfolioHistoryLogRepository;

    @Mock
    private PortfolioService portfolioService;

    private PortfolioHistoryLogService portfolioHistoryLogService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        portfolioHistoryLogService = new PortfolioHistoryLogService(portfolioHistoryLogRepository, portfolioService);
    }

    @Test
    void testLog_Success() {
        Portfolio portfolio = new Portfolio();
        portfolio.setCurrentValue(BigDecimal.valueOf(1000));
        portfolio.setId(1L);

        PortfolioHistoryLog logEntry = new PortfolioHistoryLog();
        logEntry.setPortfolio(portfolio);
        logEntry.setTimestamp(LocalDateTime.now());
        logEntry.setCurrentValue(portfolio.getCurrentValue());
        logEntry.setLogType("TestLog");

        portfolioHistoryLogService.log(portfolio, "TestLog");

        verify(portfolioHistoryLogRepository, times(1)).save(any(PortfolioHistoryLog.class));
    }

    @Test
    void testGetPortfolioHistoryLog_Success() {
        Portfolio portfolio = new Portfolio();
        portfolio.setId(1L);
        portfolio.setPortfolioType(PortfolioTypeEnum.MODERATE);

        PortfolioHistoryLog log1 = new PortfolioHistoryLog();
        log1.setPortfolio(portfolio);
        log1.setTimestamp(LocalDateTime.now());
        log1.setCurrentValue(BigDecimal.valueOf(1000));
        log1.setLogType("Log1");

        PortfolioHistoryLog log2 = new PortfolioHistoryLog();
        log2.setPortfolio(portfolio);
        log2.setTimestamp(LocalDateTime.now().minusDays(1));
        log2.setCurrentValue(BigDecimal.valueOf(1200));
        log2.setLogType("Log2");

        when(portfolioService.getPortfolioByUsernameAndType("user", PortfolioTypeEnum.MODERATE)).thenReturn(portfolio);
        when(portfolioHistoryLogRepository.findByPortfolioId(1L)).thenReturn(List.of(log1, log2));

        List<PortfolioHistoryLog> historyLogs = portfolioHistoryLogService.getPortfolioHistoryLog("user",
                PortfolioTypeEnum.MODERATE);

        assertNotNull(historyLogs);
        assertEquals(2, historyLogs.size());
        assertEquals("Log1", historyLogs.get(0).getLogType());
        assertEquals("Log2", historyLogs.get(1).getLogType());
    }
}
