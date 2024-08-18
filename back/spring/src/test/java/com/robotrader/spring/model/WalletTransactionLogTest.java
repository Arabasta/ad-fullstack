package com.robotrader.spring.model;

import com.robotrader.spring.model.log.WalletTransactionLog;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class WalletTransactionLogTest {
    @Test
    public void testSetAndGetId() {
        WalletTransactionLog log = new WalletTransactionLog();
        log.setId(1L);
        assertEquals(1L, log.getId());
    }

    @Test
    public void testSetAndGetUser() {
        WalletTransactionLog log = new WalletTransactionLog();
        User user = new User();
        log.setUser(user);
        assertEquals(user, log.getUser());
    }

    @Test
    public void testSetAndGetTransactionAmount() {
        WalletTransactionLog log = new WalletTransactionLog();
        log.setTransactionAmount(new BigDecimal("1000.00"));
        assertEquals(new BigDecimal("1000.00"), log.getTransactionAmount());
    }

    @Test
    public void testSetAndGetTotalAmount() {
        WalletTransactionLog log = new WalletTransactionLog();
        log.setTotalAmount(new BigDecimal("5000.00"));
        assertEquals(new BigDecimal("5000.00"), log.getTotalAmount());
    }

    @Test
    public void testSetAndGetTransactionType() {
        WalletTransactionLog log = new WalletTransactionLog();
        log.setTransactionType("Deposit");
        assertEquals("Deposit", log.getTransactionType());
    }

    @Test
    public void testSetAndGetTimestamp() {
        WalletTransactionLog log = new WalletTransactionLog();
        LocalDateTime now = LocalDateTime.now();
        log.setTimestamp(now);
        assertEquals(now, log.getTimestamp());
    }

    @Test
    public void testConstructorWithParameters() {
        WalletTransactionLog log = new WalletTransactionLog(
                1L,
                new User(),
                new BigDecimal("1500.00"),
                new BigDecimal("6000.00"),
                "Withdraw",
                LocalDateTime.now()
        );

        assertNotNull(log);
        assertEquals(1L, log.getId());
        assertNotNull(log.getUser());
        assertEquals(new BigDecimal("1500.00"), log.getTransactionAmount());
        assertEquals(new BigDecimal("6000.00"), log.getTotalAmount());
        assertEquals("Withdraw", log.getTransactionType());
        assertNotNull(log.getTimestamp());
    }

    @Test
    public void testDefaultConstructor() {
        WalletTransactionLog log = new WalletTransactionLog();
        assertNull(log.getUser());
        assertNull(log.getTransactionAmount());
        assertNull(log.getTotalAmount());
        assertNull(log.getTransactionType());
        assertNull(log.getTimestamp());
    }
}
