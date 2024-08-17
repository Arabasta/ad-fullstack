package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.log.PortfolioHistoryLog;

import java.util.List;

public interface IPortfolioHistoryLogService {
    void save(PortfolioHistoryLog portfolioHistoryLog);

    void log(Portfolio portfolio, String logType);

    List<PortfolioHistoryLog> getPortfolioHistoryLog(String username, PortfolioTypeEnum portfolioType);
}
