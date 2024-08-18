package com.robotrader.spring.model;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class WalletTest {
    @Test
    public void testSetAndGetTotalBalance() {
        Wallet wallet = new Wallet();
        wallet.setTotalBalance(new BigDecimal("500.00"));
        assertEquals(new BigDecimal("500.00"), wallet.getTotalBalance());
    }

    @Test
    public void testConstructorWithParameters() {
        Wallet wallet = new Wallet(
                1L,
                new BigDecimal("1000.00")
        );

        assertNotNull(wallet);
        assertEquals(1L, wallet.getId());
        assertEquals(new BigDecimal("1000.00"), wallet.getTotalBalance());
    }

    @Test
    public void testDefaultConstructor() {
        Wallet wallet = new Wallet();
        assertEquals(new BigDecimal("0"), wallet.getTotalBalance());
    }
}
