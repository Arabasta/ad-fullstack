package com.robotrader.spring.repository.log;

import com.robotrader.spring.model.log.PortfolioHistoryLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PortfolioHistoryLogRepository extends JpaRepository<PortfolioHistoryLog, Long> {
    List<PortfolioHistoryLog> findByPortfolioId(Long portfolioId);
}
