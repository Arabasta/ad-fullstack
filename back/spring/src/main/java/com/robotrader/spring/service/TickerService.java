package com.robotrader.spring.service;

import com.robotrader.spring.dto.ticker.TickerDTO;
import com.robotrader.spring.exception.notFound.TickerNotFoundException;
import com.robotrader.spring.model.Ticker;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.enums.TickerTypeEnum;
import com.robotrader.spring.repository.TickerRepository;
import com.robotrader.spring.service.interfaces.ITickerService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TickerService implements ITickerService {
    private final TickerRepository tickerRepository;

    public TickerService(TickerRepository tickerRepository) {
        this.tickerRepository = tickerRepository;
    }

    @Override
    @Transactional
    public void save(Ticker ticker) {
        tickerRepository.save(ticker);
    }

    @Override
    @Transactional
    public Ticker create(TickerDTO tickerDTO) {
        Ticker ticker = new Ticker();
        updateTickerFromDTO(ticker, tickerDTO);
        save(ticker);
        return ticker;
    }

    @Override
    public Ticker getTickerByTickerName(String tickerName) {
        Ticker ticker = tickerRepository.findByTickerName(tickerName);
        if (ticker == null) {
            throw new TickerNotFoundException("Ticker not found");
        }
        return ticker;
    }

    @Override
    public List<Ticker> getAllTickers() {
        return tickerRepository.findAll();
    }

    @Override
    public List<Ticker> getAllStockTickerName() {
        return tickerRepository.findByTickerType(TickerTypeEnum.STOCKS);
    }

    @Override
    public List<Ticker> getAllCrytpoTickerName() {
        return tickerRepository.findByTickerType(TickerTypeEnum.CRYPTO);
    }

    @Override
    public void updateTickerFromDTO(Ticker ticker, TickerDTO tickerDTO) {
        ticker.setTickerName(tickerDTO.getTickerName());
        ticker.setTickerType(tickerDTO.getTickerType());
        ticker.setPortfolioType(tickerDTO.getPortfolioType());
    }

    @Override
    public void deleteTicker(String tickerName) {
        Ticker ticker = getTickerByTickerName(tickerName);
        tickerRepository.delete(ticker);
    }

    @Override
    public List<String> getTickerByPortfolioType(PortfolioTypeEnum portfolioType) {
        return tickerRepository.findByPortfolioType(portfolioType)
                .stream()
                .map(Ticker::getTickerName)
                .collect(Collectors.toList());
    }
}
