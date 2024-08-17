package com.robotrader.spring.service;

import com.robotrader.spring.dto.livetrade.TradeTransactionLogDTO;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.log.TradeTransactionLog;
import com.robotrader.spring.repository.log.TradeTransactionLogRepository;
import com.robotrader.spring.service.log.TradeTransactionLogService;
import com.robotrader.spring.trading.dto.TradeTransaction;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

class TradeTransactionLogServiceTest {

    @Mock
    private TradeTransactionLogRepository tradeTransactionLogRepository;

    private TradeTransactionLogService tradeTransactionLogService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        tradeTransactionLogService = new TradeTransactionLogService(tradeTransactionLogRepository);
    }

    @Test
    void testLog_Success() {
        TradeTransaction tradeTransaction = new TradeTransaction();
        tradeTransaction.setTransactionId("TX123");
        tradeTransaction.setAction("BUY");
        tradeTransaction.setTicker("AAPL");
        tradeTransaction.setTransactionPrice(BigDecimal.valueOf(150));
        tradeTransaction.setTransactionQuantity(BigDecimal.valueOf(10));
        tradeTransaction.setTransactionDateTime(LocalDateTime.now());
        tradeTransaction.setTransactionAmount(BigDecimal.valueOf(1500));
        tradeTransaction.setPortfolioType(PortfolioTypeEnum.valueOf("MODERATE"));

        tradeTransactionLogService.log(tradeTransaction);

        verify(tradeTransactionLogRepository, times(1)).save(any(TradeTransactionLog.class));
    }

    @Test
    void testGetTradeTransactionLogs_Success() {
        TradeTransactionLog log1 = new TradeTransactionLog();
        log1.setTransactionId("TX123");
        log1.setTicker("AAPL");
        log1.setAction("BUY");
        log1.setTransactionDateTime(LocalDateTime.now());
        log1.setTransactionQuantity(BigDecimal.valueOf(10));
        log1.setTransactionPrice(BigDecimal.valueOf(150));
        log1.setTransactionAmount(BigDecimal.valueOf(1500));
        log1.setPortfolioType(PortfolioTypeEnum.valueOf("MODERATE"));

        TradeTransactionLog log2 = new TradeTransactionLog();
        log2.setTransactionId("TX124");
        log2.setTicker("GOOGL");
        log2.setAction("SELL");
        log2.setTransactionDateTime(LocalDateTime.now().minusDays(1));
        log2.setTransactionQuantity(BigDecimal.valueOf(5));
        log2.setTransactionPrice(BigDecimal.valueOf(1000));
        log2.setTransactionAmount(BigDecimal.valueOf(5000));
        log2.setPortfolioType(PortfolioTypeEnum.valueOf("MODERATE"));

        Pageable pageable = PageRequest.of(0, 10);
        when(tradeTransactionLogRepository.findAll(any(Pageable.class))).thenReturn(new PageImpl<>(List.of(log1, log2)));

        Page<TradeTransactionLogDTO> result = tradeTransactionLogService.getTradeTransactionLogs(pageable);

        assertNotNull(result);
        assertEquals(2, result.getTotalElements());
        assertEquals("TX123", result.getContent().get(0).getTransactionId());
        assertEquals("TX124", result.getContent().get(1).getTransactionId());
    }

    @Test
    void testGetAllTradeTransactionLogs_Success() {
        TradeTransactionLog log1 = new TradeTransactionLog();
        log1.setTransactionId("TX123");
        log1.setTicker("AAPL");
        log1.setAction("BUY");
        log1.setTransactionDateTime(LocalDateTime.now());
        log1.setTransactionQuantity(BigDecimal.valueOf(10));
        log1.setTransactionPrice(BigDecimal.valueOf(150));
        log1.setTransactionAmount(BigDecimal.valueOf(1500));
        log1.setPortfolioType(PortfolioTypeEnum.valueOf("MODERATE"));

        TradeTransactionLog log2 = new TradeTransactionLog();
        log2.setTransactionId("TX124");
        log2.setTicker("GOOGL");
        log2.setAction("SELL");
        log2.setTransactionDateTime(LocalDateTime.now().minusDays(1));
        log2.setTransactionQuantity(BigDecimal.valueOf(5));
        log2.setTransactionPrice(BigDecimal.valueOf(1000));
        log2.setTransactionAmount(BigDecimal.valueOf(5000));
        log2.setPortfolioType(PortfolioTypeEnum.valueOf("MODERATE"));

        when(tradeTransactionLogRepository.findAll()).thenReturn(List.of(log1, log2));

        List<TradeTransactionLog> result = tradeTransactionLogService.getAllTradeTransactionLogs();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("TX123", result.get(0).getTransactionId());
        assertEquals("TX124", result.get(1).getTransactionId());
    }
}
