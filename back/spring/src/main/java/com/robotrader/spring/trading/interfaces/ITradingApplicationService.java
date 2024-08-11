package com.robotrader.spring.trading.interfaces;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.trading.dto.BackTestResultDTO;

import java.util.List;
import java.util.Set;

public interface ITradingApplicationService {
    Set<String> getAlgorithms();
    BackTestResultDTO runTradingAlgorithmBackTest(List<String> ticker, PortfolioTypeEnum portfolioType, String algorithmType);
    void runTradingAlgorithmLive(String algorithmType);
    void stopTradingAlgorithmLive();
}
