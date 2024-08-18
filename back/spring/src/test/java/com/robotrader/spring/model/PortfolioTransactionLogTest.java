package com.robotrader.spring.model;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.log.PortfolioTransactionLog;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class PortfolioTransactionLogTest {
    @Test
    public void testSetAndGetId() {
        PortfolioTransactionLog log = new PortfolioTransactionLog();
        log.setId(1L);
        assertEquals(1L, log.getId());
    }

    @Test
    public void testSetAndGetTimestamp() {
        PortfolioTransactionLog log = new PortfolioTransactionLog();
        LocalDateTime now = LocalDateTime.now();
        log.setTimestamp(now);
        assertEquals(now, log.getTimestamp());
    }

    @Test
    public void testSetAndGetUser() {
        PortfolioTransactionLog log = new PortfolioTransactionLog();
        User user = new User();
        log.setUser(user);
        assertEquals(user, log.getUser());
    }

    @ParameterizedTest
    @EnumSource(PortfolioTypeEnum.class)
    public void testSetAndGetPortfolioType(PortfolioTypeEnum type) {
        PortfolioTransactionLog log = new PortfolioTransactionLog();
        log.setPortfolioType(type);
        assertEquals(type, log.getPortfolioType());
    }

    @Test
    public void testSetAndGetTransactionType() {
        PortfolioTransactionLog log = new PortfolioTransactionLog();
        log.setTransactionType("ALLOCATE");
        assertEquals("ALLOCATE", log.getTransactionType());
    }

    @Test
    public void testSetAndGetTransactionAmount() {
        PortfolioTransactionLog log = new PortfolioTransactionLog();
        log.setTransactionAmount(new BigDecimal("1000.00"));
        assertEquals(new BigDecimal("1000.00"), log.getTransactionAmount());
    }

    @Test
    public void testSetAndGetTotalAmount() {
        PortfolioTransactionLog log = new PortfolioTransactionLog();
        log.setTotalAmount(new BigDecimal("5000.00"));
        assertEquals(new BigDecimal("5000.00"), log.getTotalAmount());
    }

    @ParameterizedTest
    @EnumSource(PortfolioTypeEnum.class)
    public void testConstructorWithParameters(PortfolioTypeEnum type) {
        PortfolioTransactionLog log = new PortfolioTransactionLog(
                1L,
                LocalDateTime.now(),
                new User(),
                type,
                "ALLOCATE",
                new BigDecimal("1500.00"),
                new BigDecimal("6000.00")
        );

        assertNotNull(log);
        assertEquals(1L, log.getId());
        assertNotNull(log.getTimestamp());
        assertNotNull(log.getUser());
        assertEquals(type, log.getPortfolioType());
        assertEquals("ALLOCATE", log.getTransactionType());
        assertEquals(new BigDecimal("1500.00"), log.getTransactionAmount());
        assertEquals(new BigDecimal("6000.00"), log.getTotalAmount());
    }

    @Test
    public void testDefaultConstructor() {
        PortfolioTransactionLog log = new PortfolioTransactionLog();
        assertNull(log.getUser());
        assertNull(log.getPortfolioType());
        assertNull(log.getTransactionType());
        assertNull(log.getTransactionAmount());
        assertNull(log.getTotalAmount());
    }
}
