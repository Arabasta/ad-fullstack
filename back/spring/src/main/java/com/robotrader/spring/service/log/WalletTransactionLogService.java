package com.robotrader.spring.service.log;

import com.robotrader.spring.dto.wallet.WalletTransactionLogDTO;
import com.robotrader.spring.model.User;
import com.robotrader.spring.model.log.WalletTransactionLog;
import com.robotrader.spring.repository.log.WalletTransactionLogRepository;
import com.robotrader.spring.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class WalletTransactionLogService {

    private final WalletTransactionLogRepository walletTransactionLogRepository;
    private final UserService userService;

    @Autowired
    public WalletTransactionLogService(WalletTransactionLogRepository walletTransactionLogRepository, @Lazy UserService userService) {
        this.walletTransactionLogRepository = walletTransactionLogRepository;
        this.userService = userService;
    }

    @Transactional
    public void save(WalletTransactionLog walletTransactionLog) {
        walletTransactionLogRepository.save(walletTransactionLog);
    }

    @Transactional
    public void log(User user, BigDecimal transactionAmount, BigDecimal totalAmount, String transactionType) {
        WalletTransactionLog logEntry = new WalletTransactionLog();
        logEntry.setTimestamp(LocalDateTime.now());
        logEntry.setUser(user);
        logEntry.setTransactionAmount(transactionAmount);
        logEntry.setTotalAmount(totalAmount);
        logEntry.setTransactionType(transactionType);

        save(logEntry);
    }

    public Page<WalletTransactionLogDTO> getWalletTransactionLogs(String username, Pageable pageable) {
        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "id")
        );
        Page<WalletTransactionLog> logs = walletTransactionLogRepository.findByUser(userService.getUserByUsername(username), sortedPageable);
        return logs.map(log -> new WalletTransactionLogDTO(
                log.getId(),
                log.getTimestamp(),
                log.getTransactionType(),
                log.getTransactionAmount(),
                log.getTotalAmount()
        ));
    }
}
