package com.robotrader.spring.service.log;

import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.log.PortfolioHistoryLog;
import com.robotrader.spring.repository.log.PortfolioHistoryLogRepository;
import com.robotrader.spring.service.PortfolioService;
import com.robotrader.spring.service.UserService;
import com.robotrader.spring.service.interfaces.IPortfolioHistoryLogService;
import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PortfolioHistoryLogService implements IPortfolioHistoryLogService {
    private final PortfolioHistoryLogRepository portfolioHistoryLogRepository;
    private final PortfolioService portfolioService;

    public PortfolioHistoryLogService(PortfolioHistoryLogRepository portfolioHistoryLogRepository, @Lazy PortfolioService portfolioService) {
        this.portfolioHistoryLogRepository = portfolioHistoryLogRepository;
        this.portfolioService = portfolioService;
    }

    @Override
    @Transactional
    public void save(PortfolioHistoryLog portfolioHistoryLog) {
        portfolioHistoryLogRepository.save(portfolioHistoryLog);
    }

    @Override
    @Transactional
    public void log(Portfolio portfolio, String logType) {
        PortfolioHistoryLog logEntry = new PortfolioHistoryLog();

        logEntry.setPortfolio(portfolio);
        logEntry.setTimestamp(LocalDateTime.now());
        logEntry.setCurrentValue(portfolio.getCurrentValue());
        logEntry.setLogType(logType);

        save(logEntry);
    }

    @Override
    public List<PortfolioHistoryLog> getPortfolioHistoryLog(String username, PortfolioTypeEnum portfolioType) {
        Long id = portfolioService.getPortfolioByUsernameAndType(username, portfolioType).getId();
        return portfolioHistoryLogRepository.findByPortfolioId(id);
    }
}
