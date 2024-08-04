package com.robotrader.spring.repository.log;

import com.robotrader.spring.model.User;
import com.robotrader.spring.model.log.PortfolioTransactionLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PortfolioTransactionLogRepository extends JpaRepository<PortfolioTransactionLog, Long> {
    Page<PortfolioTransactionLog> findByUser(User user, Pageable pageable);
}
