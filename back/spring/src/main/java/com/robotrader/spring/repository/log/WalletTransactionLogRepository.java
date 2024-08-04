package com.robotrader.spring.repository.log;

import com.robotrader.spring.model.User;
import com.robotrader.spring.model.log.WalletTransactionLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletTransactionLogRepository extends JpaRepository<WalletTransactionLog, Long> {
    Page<WalletTransactionLog> findByUser(User user, Pageable pageable);
}
