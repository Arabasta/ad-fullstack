package com.robotrader.spring.trading.interfaces;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.enums.TickerTypeEnum;
import com.robotrader.spring.trading.dto.BackTestResultDTO;
import com.robotrader.spring.trading.service.MarketDataService;

import java.util.List;

public interface ITradingApplicationService {
    List<String> getAlgorithmList();
    BackTestResultDTO runTradingAlgorithmBackTest(String ticker, PortfolioTypeEnum portfolioType);
    void runTradingAlgorithmLive(List<String> tickers, PortfolioTypeEnum portfolioType, TickerTypeEnum tickerType);
    void stopTradingAlgorithmLive();
    void runTradingAlgorithm();
}
