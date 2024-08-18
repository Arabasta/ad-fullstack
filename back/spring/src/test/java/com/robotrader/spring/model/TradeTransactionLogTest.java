package com.robotrader.spring.model;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.log.TradeTransactionLog;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

public class TradeTransactionLogTest {
    @Test
    public void testSetAndGetTransactionId() {
        TradeTransactionLog log = new TradeTransactionLog();
        log.setTransactionId("123456");
        assertEquals("123456", log.getTransactionId());
    }

    @Test
    public void testSetAndGetTicker() {
        TradeTransactionLog log = new TradeTransactionLog();
        log.setTicker("AAPL");
        assertEquals("AAPL", log.getTicker());
    }

    @Test
    public void testSetAndGetAction() {
        TradeTransactionLog log = new TradeTransactionLog();
        log.setAction("BUY");
        assertEquals("BUY", log.getAction());
    }

    @Test
    public void testSetAndGetTransactionDateTime() {
        TradeTransactionLog log = new TradeTransactionLog();
        LocalDateTime now = LocalDateTime.now();
        log.setTransactionDateTime(now);
        assertEquals(now, log.getTransactionDateTime());
    }

    @Test
    public void testSetAndGetTransactionQuantity() {
        TradeTransactionLog log = new TradeTransactionLog();
        log.setTransactionQuantity(new BigDecimal("100.00"));
        assertEquals(new BigDecimal("100.00"), log.getTransactionQuantity());
    }

    @Test
    public void testSetAndGetTransactionPrice() {
        TradeTransactionLog log = new TradeTransactionLog();
        log.setTransactionPrice(new BigDecimal("150.50"));
        assertEquals(new BigDecimal("150.50"), log.getTransactionPrice());
    }

    @Test
    public void testSetAndGetTransactionAmount() {
        TradeTransactionLog log = new TradeTransactionLog();
        log.setTransactionAmount(new BigDecimal("15050.00"));
        assertEquals(new BigDecimal("15050.00"), log.getTransactionAmount());
    }

    @ParameterizedTest
    @EnumSource(PortfolioTypeEnum.class)
    public void testSetAndGetPortfolioType(PortfolioTypeEnum type) {
        TradeTransactionLog log = new TradeTransactionLog();
        log.setPortfolioType(type);
        assertEquals(type, log.getPortfolioType());
    }

    @ParameterizedTest
    @EnumSource(PortfolioTypeEnum.class)
    public void testConstructorWithParameters(PortfolioTypeEnum type) {
        TradeTransactionLog log = new TradeTransactionLog(
                "123456",
                "AAPL",
                "BUY",
                LocalDateTime.now(),
                new BigDecimal("100.00"),
                new BigDecimal("150.50"),
                new BigDecimal("15050.00"),
                type
        );

        assertNotNull(log);
        assertEquals("123456", log.getTransactionId());
        assertEquals("AAPL", log.getTicker());
        assertEquals("BUY", log.getAction());
        assertNotNull(log.getTransactionDateTime());
        assertEquals(new BigDecimal("100.00"), log.getTransactionQuantity());
        assertEquals(new BigDecimal("150.50"), log.getTransactionPrice());
        assertEquals(new BigDecimal("15050.00"), log.getTransactionAmount());
        assertEquals(type, log.getPortfolioType());
    }

    @Test
    public void testDefaultConstructor() {
        TradeTransactionLog log = new TradeTransactionLog();
        assertNull(log.getTransactionId());
        assertNull(log.getTicker());
        assertNull(log.getAction());
        assertNull(log.getTransactionDateTime());
        assertNull(log.getTransactionQuantity());
        assertNull(log.getTransactionPrice());
        assertNull(log.getTransactionAmount());
        assertNull(log.getPortfolioType());
    }
}
