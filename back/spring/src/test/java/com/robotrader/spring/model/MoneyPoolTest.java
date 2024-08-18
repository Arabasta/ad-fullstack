package com.robotrader.spring.model;

import org.junit.jupiter.api.Test;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

public class MoneyPoolTest {
    @ParameterizedTest
    @EnumSource(PortfolioTypeEnum.class)
    public void testSetAndGetPortfolioType(PortfolioTypeEnum type) {
        MoneyPool moneyPool = new MoneyPool();
        moneyPool.setPortfolioType(type);
        assertEquals(type, moneyPool.getPortfolioType());
    }

    @Test
    public void testSetAndGetPoolBalance() {
        MoneyPool moneyPool = new MoneyPool();
        moneyPool.setPoolBalance(new BigDecimal("500000.00"));
        assertEquals(new BigDecimal("500000.00"), moneyPool.getPoolBalance());
    }

    @Test
    public void testSetAndGetUnitPrice() {
        MoneyPool moneyPool = new MoneyPool();
        moneyPool.setUnitPrice(new BigDecimal("100.00"));
        assertEquals(new BigDecimal("100.00"), moneyPool.getUnitPrice());
    }

    @Test
    public void testSetAndGetTotalUnitQty() {
        MoneyPool moneyPool = new MoneyPool();
        moneyPool.setTotalUnitQty(new BigDecimal("2500.00"));
        assertEquals(new BigDecimal("2500.00"), moneyPool.getTotalUnitQty());
    }

    @ParameterizedTest
    @EnumSource(PortfolioTypeEnum.class)
    public void testConstructorWithParameters(PortfolioTypeEnum type) {
        MoneyPool moneyPool = new MoneyPool(
                1L,
                type,
                new BigDecimal("1000000.00"),
                new BigDecimal("50.00"),
                new BigDecimal("20000.00")
        );

        assertNotNull(moneyPool);
        assertEquals(1L, moneyPool.getId());
        assertEquals(type, moneyPool.getPortfolioType());
        assertEquals(new BigDecimal("1000000.00"), moneyPool.getPoolBalance());
        assertEquals(new BigDecimal("50.00"), moneyPool.getUnitPrice());
        assertEquals(new BigDecimal("20000.00"), moneyPool.getTotalUnitQty());
    }
}
