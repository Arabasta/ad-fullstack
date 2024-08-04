package com.robotrader.spring.service.log;

import com.robotrader.spring.dto.portfolio.PortfolioTransactionLogDTO;
import com.robotrader.spring.model.User;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.log.PortfolioTransactionLog;
import com.robotrader.spring.repository.log.PortfolioTransactionLogRepository;
import com.robotrader.spring.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class PortfolioTransactionLogService {

    private final PortfolioTransactionLogRepository portfolioTransactionLogRepository;
    private final UserService userService;

    @Autowired
    public PortfolioTransactionLogService(PortfolioTransactionLogRepository portfolioTransactionLogRepository, @Lazy UserService userService) {
        this.portfolioTransactionLogRepository = portfolioTransactionLogRepository;
        this.userService = userService;
    }

    @Transactional
    public void save(PortfolioTransactionLog portfolioTransactionLog) {
        portfolioTransactionLogRepository.save(portfolioTransactionLog);
    }

    @Transactional
    public void log(User user, PortfolioTypeEnum portfolioType, String transactionType, BigDecimal transactionAmount, BigDecimal totalAmount) {
        PortfolioTransactionLog logEntry = new PortfolioTransactionLog();
        logEntry.setTimestamp(LocalDateTime.now());
        logEntry.setUser(user);
        logEntry.setPortfolioType(portfolioType);
        logEntry.setTransactionType(transactionType);
        logEntry.setTransactionAmount(transactionAmount);
        logEntry.setTotalAmount(totalAmount);

        save(logEntry);
    }

    public Page<PortfolioTransactionLogDTO> getPortfolioTransactionLogs(String username, Pageable pageable) {
        Page<PortfolioTransactionLog> logs = portfolioTransactionLogRepository.findByUser(userService.getUserByUsername(username), pageable);
        return logs.map(log -> new PortfolioTransactionLogDTO(
                log.getId(),
                log.getTimestamp(),
                log.getPortfolioType(),
                log.getTransactionType(),
                log.getTransactionAmount(),
                log.getTotalAmount()
        ));
    }
}
