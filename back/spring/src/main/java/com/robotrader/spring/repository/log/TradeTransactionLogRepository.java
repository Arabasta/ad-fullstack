package com.robotrader.spring.repository.log;

import com.robotrader.spring.model.log.TradeTransactionLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TradeTransactionLogRepository extends JpaRepository<TradeTransactionLog, Long> {
}
