package com.robotrader.spring.model;

import com.robotrader.spring.model.log.PortfolioHistoryLog;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class PortfolioHistoryLogTest {
    @Test
    public void testSetAndGetId() {
        PortfolioHistoryLog log = new PortfolioHistoryLog();
        log.setId(1L);
        assertEquals(1L, log.getId());
    }

    @Test
    public void testSetAndGetPortfolio() {
        PortfolioHistoryLog log = new PortfolioHistoryLog();
        Portfolio portfolio = new Portfolio();
        log.setPortfolio(portfolio);
        assertEquals(portfolio, log.getPortfolio());
    }

    @Test
    public void testSetAndGetCurrentValue() {
        PortfolioHistoryLog log = new PortfolioHistoryLog();
        log.setCurrentValue(new BigDecimal("50000.00"));
        assertEquals(new BigDecimal("50000.00"), log.getCurrentValue());
    }

    @Test
    public void testSetAndGetTimestamp() {
        PortfolioHistoryLog log = new PortfolioHistoryLog();
        LocalDateTime now = LocalDateTime.now();
        log.setTimestamp(now);
        assertEquals(now, log.getTimestamp());
    }

    @Test
    public void testSetAndGetLogType() {
        PortfolioHistoryLog log = new PortfolioHistoryLog();
        log.setLogType("Trade");
        assertEquals("Trade", log.getLogType());
    }

    @Test
    public void testConstructorWithParameters() {
        PortfolioHistoryLog log = new PortfolioHistoryLog(
                1L,
                new Portfolio(),
                new BigDecimal("75000.00"),
                LocalDateTime.now(),
                "Trade"
        );

        assertNotNull(log);
        assertEquals(1L, log.getId());
        assertNotNull(log.getPortfolio());
        assertEquals(new BigDecimal("75000.00"), log.getCurrentValue());
        assertNotNull(log.getTimestamp());
        assertEquals("Trade", log.getLogType());
    }

    @Test
    public void testDefaultConstructor() {
        PortfolioHistoryLog log = new PortfolioHistoryLog();
        assertNull(log.getPortfolio());
        assertEquals(null, log.getCurrentValue());
        assertNull(log.getTimestamp());
        assertNull(log.getLogType());
    }

}
