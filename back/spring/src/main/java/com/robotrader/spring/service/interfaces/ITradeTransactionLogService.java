package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.livetrade.TradeTransactionLogDTO;
import com.robotrader.spring.model.log.TradeTransactionLog;
import com.robotrader.spring.trading.dto.TradeTransaction;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ITradeTransactionLogService {
    @Transactional
    void save(TradeTransactionLog tradeTransactionLog);

    @Transactional
    void log(TradeTransaction tradeTransaction);

    Page<TradeTransactionLogDTO> getTradeTransactionLogs(Pageable pageable);

    List<TradeTransactionLog> getAllTradeTransactionLogs();
}
