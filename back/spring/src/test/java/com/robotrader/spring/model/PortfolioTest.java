package com.robotrader.spring.model;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class PortfolioTest {
    @ParameterizedTest
    @EnumSource(PortfolioTypeEnum.class)
    public void testSetAndGetPortfolioType(PortfolioTypeEnum type) {
        Portfolio portfolio = new Portfolio();
        portfolio.setPortfolioType(type);
        assertEquals(type, portfolio.getPortfolioType());
    }

    @Test
    public void testSetAndGetAllocatedBalance() {
        Portfolio portfolio = new Portfolio();
        portfolio.setAllocatedBalance(new BigDecimal("500000.00"));
        assertEquals(new BigDecimal("500000.00"), portfolio.getAllocatedBalance());
    }

    @Test
    public void testSetAndGetCurrentValue() {
        Portfolio portfolio = new Portfolio();
        portfolio.setCurrentValue(new BigDecimal("750000.00"));
        assertEquals(new BigDecimal("750000.00"), portfolio.getCurrentValue());
    }

    @Test
    public void testSetAndGetAllocatedUnitQty() {
        Portfolio portfolio = new Portfolio();
        portfolio.setAllocatedUnitQty(new BigDecimal("100.00"));
        assertEquals(new BigDecimal("100.00"), portfolio.getAllocatedUnitQty());
    }

    @ParameterizedTest
    @EnumSource(PortfolioTypeEnum.class)
    public void testConstructorWithParameters(PortfolioTypeEnum type) {
        Portfolio portfolio = new Portfolio(
                1L,
                type,
                new Rule(),
                new BigDecimal("1000000.00"),
                new BigDecimal("950000.00"),
                new BigDecimal("10.00")
        );

        assertNotNull(portfolio);
        assertEquals(1L, portfolio.getId());
        assertEquals(type, portfolio.getPortfolioType());
        assertNotNull(portfolio.getRule()); // Assuming Rule is properly initialized
        assertEquals(new BigDecimal("1000000.00"), portfolio.getAllocatedBalance());
        assertEquals(new BigDecimal("950000.00"), portfolio.getCurrentValue());
        assertEquals(new BigDecimal("10.00"), portfolio.getAllocatedUnitQty());
    }

    @Test
    public void testDefaultConstructor() {
        Portfolio portfolio = new Portfolio();
        assertEquals(new BigDecimal("0"), portfolio.getAllocatedBalance());
        assertEquals(new BigDecimal("0"), portfolio.getCurrentValue());
        assertEquals(new BigDecimal("0"), portfolio.getAllocatedUnitQty());
    }
}
