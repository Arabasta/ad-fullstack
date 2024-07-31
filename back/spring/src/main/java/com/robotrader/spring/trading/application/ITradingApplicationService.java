package com.robotrader.spring.trading.application;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.trading.dto.BackTestResultDTO;
import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.service.MarketDataWebSocketService;

import java.util.List;

public interface ITradingApplicationService {
    List<String> getAlgorithmList();
    BackTestResultDTO runTradingAlgorithmBackTest(String ticker, PortfolioTypeEnum portfolioType);
    void runTradingAlgorithmLive(List<String> tickers, PortfolioTypeEnum portfolioType, MarketDataWebSocketService marketDataWebSocketService);
    void runTradingAlgorithm();
}
