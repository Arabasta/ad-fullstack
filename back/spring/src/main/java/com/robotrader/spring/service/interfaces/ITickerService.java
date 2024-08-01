package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.ticker.TickerDTO;
import com.robotrader.spring.model.Ticker;

import java.util.List;

public interface ITickerService {
    void save (Ticker ticker);
    Ticker create(TickerDTO tickerDTO);
    Ticker getTickerByTickerName(String tickerName);
    List<Ticker> getAllTickers();
    TickerDTO update(String tickerName, TickerDTO tickerDTO);
    void updateTickerFromDTO(Ticker ticker, TickerDTO tickerDTO);
}
