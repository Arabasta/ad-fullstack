package com.robotrader.spring.service;

import com.robotrader.spring.dto.moneyPool.MoneyPoolDTO;
import com.robotrader.spring.model.MoneyPool;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.repository.MoneyPoolRepository;
import com.robotrader.spring.trading.dto.TradeTransaction;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class MoneyPoolServiceTest {

    @Mock
    private MoneyPoolRepository moneyPoolRepository;

    @Mock
    private PortfolioService portfolioService;

    private MoneyPoolService moneyPoolService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        moneyPoolService = new MoneyPoolService(moneyPoolRepository, portfolioService);
    }

    @Test
    void testFindByPortfolioType_Success() {
        PortfolioTypeEnum portfolioType = PortfolioTypeEnum.MODERATE;
        MoneyPool mockMoneyPool = new MoneyPool();
        mockMoneyPool.setPortfolioType(portfolioType);

        when(moneyPoolRepository.findByPortfolioType(portfolioType)).thenReturn(mockMoneyPool);

        MoneyPool result = moneyPoolService.findByPortfolioType(portfolioType);

        assertNotNull(result);
        assertEquals(portfolioType, result.getPortfolioType());
    }

    @Test
    void testGetUnitPriceByPortfolioType_Success() {
        PortfolioTypeEnum portfolioType = PortfolioTypeEnum.CONSERVATIVE;
        MoneyPool mockMoneyPool = new MoneyPool();
        mockMoneyPool.setUnitPrice(BigDecimal.valueOf(100));

        when(moneyPoolRepository.findByPortfolioType(portfolioType)).thenReturn(mockMoneyPool);

        BigDecimal result = moneyPoolService.getUnitPriceByPortfolioType(portfolioType);

        assertEquals(BigDecimal.valueOf(100), result);
    }

    @Test
    void testUpdateFundsToMoneyPool_AddFunds() {
        PortfolioTypeEnum portfolioType = PortfolioTypeEnum.AGGRESSIVE;
        MoneyPool mockMoneyPool = new MoneyPool();
        mockMoneyPool.setUnitPrice(BigDecimal.valueOf(100));
        mockMoneyPool.setTotalUnitQty(BigDecimal.valueOf(1000));
        mockMoneyPool.setPoolBalance(BigDecimal.valueOf(100000));

        when(moneyPoolRepository.findByPortfolioType(portfolioType)).thenReturn(mockMoneyPool);

        BigDecimal result = moneyPoolService.updateFundsToMoneyPool(BigDecimal.valueOf(5000), portfolioType, true);

        assertEquals(BigDecimal.valueOf(50).setScale(4), result);
        verify(moneyPoolRepository).save(mockMoneyPool);
        assertEquals(BigDecimal.valueOf(105000), mockMoneyPool.getPoolBalance());
    }

    @Test
    void testUpdateFundsToMoneyPool_RemoveFunds() {
        PortfolioTypeEnum portfolioType = PortfolioTypeEnum.AGGRESSIVE;
        MoneyPool mockMoneyPool = new MoneyPool();
        mockMoneyPool.setUnitPrice(BigDecimal.valueOf(100));
        mockMoneyPool.setTotalUnitQty(BigDecimal.valueOf(1000));
        mockMoneyPool.setPoolBalance(BigDecimal.valueOf(100000));

        when(moneyPoolRepository.findByPortfolioType(portfolioType)).thenReturn(mockMoneyPool);

        BigDecimal result = moneyPoolService.updateFundsToMoneyPool(BigDecimal.valueOf(5000), portfolioType, false);

        assertEquals(BigDecimal.valueOf(50).setScale(4), result);
        verify(moneyPoolRepository).save(mockMoneyPool);
        assertEquals(BigDecimal.valueOf(95000), mockMoneyPool.getPoolBalance());
    }

    @Test
    void testUpdateTrade_Success() {
        TradeTransaction currentTransaction = new TradeTransaction();
        currentTransaction.setTransactionAmount(BigDecimal.valueOf(10000));
        currentTransaction.setPortfolioType(PortfolioTypeEnum.MODERATE);
        currentTransaction.setAction("SELL");

        TradeTransaction lastTransaction = new TradeTransaction();
        lastTransaction.setTransactionAmount(BigDecimal.valueOf(9500));

        MoneyPool mockMoneyPool = new MoneyPool();
        mockMoneyPool.setTotalUnitQty(BigDecimal.valueOf(1000));
        mockMoneyPool.setPoolBalance(BigDecimal.valueOf(100000));
        mockMoneyPool.setUnitPrice(BigDecimal.valueOf(100));

        when(moneyPoolRepository.findByPortfolioType(PortfolioTypeEnum.MODERATE)).thenReturn(mockMoneyPool);

        BigDecimal result = moneyPoolService.updateTrade(currentTransaction, lastTransaction);

        assertEquals(BigDecimal.valueOf(110000), result);
        verify(moneyPoolRepository).save(mockMoneyPool);
    }

    @Test
    void testCreateMoneyPool_Success() {
        MoneyPoolDTO moneyPoolDTO = new MoneyPoolDTO();
        moneyPoolDTO.setPoolBalance(BigDecimal.valueOf(100000));
        moneyPoolDTO.setTotalUnitQty(BigDecimal.valueOf(1000));
        moneyPoolDTO.setUnitPrice(BigDecimal.valueOf(100));
        moneyPoolDTO.setPortfolioType(PortfolioTypeEnum.MODERATE);

        MoneyPool result = moneyPoolService.create(moneyPoolDTO);

        assertNotNull(result);
        verify(moneyPoolRepository).save(result);
        assertEquals(BigDecimal.valueOf(100000), result.getPoolBalance());
        assertEquals(BigDecimal.valueOf(1000), result.getTotalUnitQty());
        assertEquals(BigDecimal.valueOf(100), result.getUnitPrice());
        assertEquals(PortfolioTypeEnum.MODERATE, result.getPortfolioType());
    }

    @Test
    void testUpdateMoneyPool_Success() {
        PortfolioTypeEnum portfolioType = PortfolioTypeEnum.MODERATE;
        MoneyPoolDTO moneyPoolDTO = new MoneyPoolDTO();
        moneyPoolDTO.setPoolBalance(BigDecimal.valueOf(110000));
        moneyPoolDTO.setTotalUnitQty(BigDecimal.valueOf(1100));
        moneyPoolDTO.setUnitPrice(BigDecimal.valueOf(100));
        moneyPoolDTO.setPortfolioType(portfolioType);

        MoneyPool mockMoneyPool = new MoneyPool();
        mockMoneyPool.setPortfolioType(portfolioType);

        when(moneyPoolRepository.findByPortfolioType(portfolioType)).thenReturn(mockMoneyPool);

        MoneyPoolDTO result = moneyPoolService.updateMoneyPool(moneyPoolDTO);

        assertNotNull(result);
        verify(moneyPoolRepository).save(mockMoneyPool);
        assertEquals(BigDecimal.valueOf(110000), mockMoneyPool.getPoolBalance());
        assertEquals(BigDecimal.valueOf(1100), mockMoneyPool.getTotalUnitQty());
        assertEquals(BigDecimal.valueOf(100), mockMoneyPool.getUnitPrice());
    }
}
