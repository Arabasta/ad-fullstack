package com.robotrader.spring.model;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.enums.TickerTypeEnum;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import static org.junit.jupiter.api.Assertions.*;

public class TickerTest {
    @ParameterizedTest
    @EnumSource(TickerTypeEnum.class)
    public void testSetAndGetTickerType(TickerTypeEnum type) {
        Ticker ticker = new Ticker();
        ticker.setTickerType(type);
        assertEquals(type, ticker.getTickerType());
    }

    @Test
    public void testSetAndGetTickerName() {
        Ticker ticker = new Ticker();
        ticker.setTickerName("AAPL");
        assertEquals("AAPL", ticker.getTickerName());
    }

    @ParameterizedTest
    @EnumSource(PortfolioTypeEnum.class)
    public void testSetAndGetPortfolioType(PortfolioTypeEnum type) {
        Ticker ticker = new Ticker();
        ticker.setPortfolioType(type);
        assertEquals(type, ticker.getPortfolioType());
    }

    @Test
    public void testConstructorWithParameters() {
        Ticker ticker = new Ticker(
                1L,
                TickerTypeEnum.STOCKS,
                "GOOGL",
                PortfolioTypeEnum.AGGRESSIVE
        );

        assertNotNull(ticker);
        assertEquals(1L, ticker.getId());
        assertEquals(TickerTypeEnum.STOCKS, ticker.getTickerType());
        assertEquals("GOOGL", ticker.getTickerName());
        assertEquals(PortfolioTypeEnum.AGGRESSIVE, ticker.getPortfolioType());
    }

    @Test
    public void testDefaultConstructor() {
        Ticker ticker = new Ticker();
        assertNull(ticker.getTickerType());
        assertNull(ticker.getTickerName());
        assertNull(ticker.getPortfolioType());
    }
}
