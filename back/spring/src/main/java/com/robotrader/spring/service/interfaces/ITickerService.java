package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.ticker.TickerDTO;
import com.robotrader.spring.model.Ticker;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;

import java.util.List;

public interface ITickerService {
    void save (Ticker ticker);
    Ticker create(TickerDTO tickerDTO);
    Ticker getTickerByTickerName(String tickerName);
    List<Ticker> getAllTickers();
    List<String> getAllStockTickerName();
    List<String> getAllCrytpoTickerName();
    void updateTickerFromDTO(Ticker ticker, TickerDTO tickerDTO);
    void deleteTicker(String tickerName);

    List<String> getTickerByPortfolioType(PortfolioTypeEnum portfolioType);
}
