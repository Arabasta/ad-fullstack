package com.robotrader.spring.model;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class RuleTest {
    @Test
    public void testSetAndGetStopLossInitialValue() {
        Rule rule = new Rule();
        rule.setStopLossInitialValue(new BigDecimal("50000.00"));
        assertEquals(new BigDecimal("50000.00"), rule.getStopLossInitialValue());
    }

    @Test
    public void testSetAndGetStopLossPercentage() {
        Rule rule = new Rule();
        rule.setStopLossPercentage(10.0);
        assertEquals(10.0, rule.getStopLossPercentage());
    }

    @Test
    public void testSetAndGetRecurringAllocationAmount() {
        Rule rule = new Rule();
        rule.setRecurringAllocationAmount(new BigDecimal("30000.00"));
        assertEquals(new BigDecimal("30000.00"), rule.getRecurringAllocationAmount());
    }

    @Test
    public void testSetAndGetRecurringAllocationDay() {
        Rule rule = new Rule();
        rule.setRecurringAllocationDay(15);
        assertEquals(15, rule.getRecurringAllocationDay());
    }

    @Test
    public void testConstructorWithParameters() {
        Rule rule = new Rule(
                1L,
                new BigDecimal("50000.00"),
                10.0,
                new BigDecimal("30000.00"),
                15
        );

        assertNotNull(rule);
        assertEquals(1L, rule.getId());
        assertEquals(new BigDecimal("50000.00"), rule.getStopLossInitialValue());
        assertEquals(10.0, rule.getStopLossPercentage());
        assertEquals(new BigDecimal("30000.00"), rule.getRecurringAllocationAmount());
        assertEquals(15, rule.getRecurringAllocationDay());
    }

    @Test
    public void testDefaultConstructor() {
        Rule rule = new Rule();
        assertEquals(null, rule.getStopLossInitialValue());
        assertEquals(null, rule.getStopLossPercentage());
        assertEquals(null, rule.getRecurringAllocationAmount());
        assertEquals(null, rule.getRecurringAllocationDay());
    }
}
