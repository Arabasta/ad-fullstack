package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.log.PortfolioHistoryLog;
import jakarta.transaction.Transactional;

import java.util.List;

public interface IPortfolioHistoryLogService {
    @Transactional
    void save(PortfolioHistoryLog portfolioHistoryLog);

    @Transactional
    void log(Portfolio portfolio, String logType);

    List<PortfolioHistoryLog> getPortfolioHistoryLog(String username, PortfolioTypeEnum portfolioType);
}
