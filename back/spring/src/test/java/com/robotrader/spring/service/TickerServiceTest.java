package com.robotrader.spring.service;

import com.robotrader.spring.dto.ticker.TickerDTO;
import com.robotrader.spring.exception.notFound.TickerNotFoundException;
import com.robotrader.spring.model.Ticker;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.enums.TickerTypeEnum;
import com.robotrader.spring.repository.TickerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class TickerServiceTest {

    @Mock
    private TickerRepository tickerRepository;

    private TickerService tickerService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        tickerService = new TickerService(tickerRepository);
    }

    @Test
    void testSave_Success() {
        Ticker ticker = new Ticker();
        ticker.setTickerName("AAPL");

        tickerService.save(ticker);

        verify(tickerRepository, times(1)).save(ticker);
    }

    @Test
    void testCreate_Success() {
        TickerDTO tickerDTO = new TickerDTO();
        tickerDTO.setTickerName("AAPL");
        tickerDTO.setTickerType(TickerTypeEnum.STOCKS);
        tickerDTO.setPortfolioType(PortfolioTypeEnum.CONSERVATIVE);

        Ticker ticker = tickerService.create(tickerDTO);

        ArgumentCaptor<Ticker> tickerArgumentCaptor = ArgumentCaptor.forClass(Ticker.class);
        verify(tickerRepository, times(1)).save(tickerArgumentCaptor.capture());

        Ticker savedTicker = tickerArgumentCaptor.getValue();
        assertNotNull(savedTicker);
        assertEquals("AAPL", savedTicker.getTickerName());
        assertEquals(TickerTypeEnum.STOCKS, savedTicker.getTickerType());
        assertEquals(PortfolioTypeEnum.CONSERVATIVE, savedTicker.getPortfolioType());
    }

    @Test
    void testFindById_Success() {
        Ticker ticker = new Ticker();
        ticker.setId(1L);
        ticker.setTickerName("AAPL");

        when(tickerRepository.findById(1L)).thenReturn(Optional.of(ticker));

        Ticker foundTicker = tickerService.findById(1L);

        assertNotNull(foundTicker);
        assertEquals(1L, foundTicker.getId());
        assertEquals("AAPL", foundTicker.getTickerName());
    }

    @Test
    void testFindById_NotFound() {
        when(tickerRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(TickerNotFoundException.class, () -> tickerService.findById(1L));
    }

    @Test
    void testGetAllTickers_Success() {
        Ticker ticker1 = new Ticker();
        ticker1.setTickerName("AAPL");

        Ticker ticker2 = new Ticker();
        ticker2.setTickerName("GOOGL");

        when(tickerRepository.findAll()).thenReturn(Arrays.asList(ticker1, ticker2));

        List<Ticker> tickers = tickerService.getAllTickers();

        assertNotNull(tickers);
        assertEquals(2, tickers.size());
        assertEquals("AAPL", tickers.get(0).getTickerName());
        assertEquals("GOOGL", tickers.get(1).getTickerName());
    }

    @Test
    void testGetAllStockTickerName_Success() {
        Ticker ticker1 = new Ticker();
        ticker1.setTickerName("AAPL");
        ticker1.setTickerType(TickerTypeEnum.STOCKS);

        Ticker ticker2 = new Ticker();
        ticker2.setTickerName("GOOGL");
        ticker2.setTickerType(TickerTypeEnum.STOCKS);

        when(tickerRepository.findByTickerType(TickerTypeEnum.STOCKS)).thenReturn(Arrays.asList(ticker1, ticker2));

        List<Ticker> tickers = tickerService.getAllStockTickerName();

        assertNotNull(tickers);
        assertEquals(2, tickers.size());
        assertEquals("AAPL", tickers.get(0).getTickerName());
        assertEquals("GOOGL", tickers.get(1).getTickerName());
    }

    @Test
    void testGetAllCryptoTickerName_Success() {
        Ticker ticker1 = new Ticker();
        ticker1.setTickerName("BTC");
        ticker1.setTickerType(TickerTypeEnum.CRYPTO);

        Ticker ticker2 = new Ticker();
        ticker2.setTickerName("ETH");
        ticker2.setTickerType(TickerTypeEnum.CRYPTO);

        when(tickerRepository.findByTickerType(TickerTypeEnum.CRYPTO)).thenReturn(Arrays.asList(ticker1, ticker2));

        List<Ticker> tickers = tickerService.getAllCrytpoTickerName();

        assertNotNull(tickers);
        assertEquals(2, tickers.size());
        assertEquals("BTC", tickers.get(0).getTickerName());
        assertEquals("ETH", tickers.get(1).getTickerName());
    }

    @Test
    void testDeleteTicker_Success() {
        Ticker ticker = new Ticker();
        ticker.setId(1L);
        ticker.setTickerName("AAPL");

        when(tickerRepository.findById(1L)).thenReturn(Optional.of(ticker));

        tickerService.deleteTicker(1L);

        verify(tickerRepository, times(1)).delete(ticker);
    }

    @Test
    void testDeleteTicker_NotFound() {
        when(tickerRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(TickerNotFoundException.class, () -> tickerService.deleteTicker(1L));
    }

    @Test
    void testGetTickerByPortfolioType_Success() {
        Ticker ticker1 = new Ticker();
        ticker1.setTickerName("AAPL");
        ticker1.setPortfolioType(PortfolioTypeEnum.CONSERVATIVE);

        Ticker ticker2 = new Ticker();
        ticker2.setTickerName("GOOGL");
        ticker2.setPortfolioType(PortfolioTypeEnum.CONSERVATIVE);

        when(tickerRepository.findByPortfolioType(PortfolioTypeEnum.CONSERVATIVE)).thenReturn(Arrays.asList(ticker1, ticker2));

        List<String> tickers = tickerService.getTickerByPortfolioType(PortfolioTypeEnum.CONSERVATIVE);

        assertNotNull(tickers);
        assertEquals(2, tickers.size());
        assertEquals("AAPL", tickers.get(0));
        assertEquals("GOOGL", tickers.get(1));
    }
}
