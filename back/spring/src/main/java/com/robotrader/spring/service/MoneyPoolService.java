package com.robotrader.spring.service;

import com.robotrader.spring.service.interfaces.IMoneyPoolService;
import com.robotrader.spring.model.MoneyPool;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.repository.MoneyPoolRepository;
import com.robotrader.spring.trading.dto.TradeTransaction;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class MoneyPoolService implements IMoneyPoolService {
    private final MoneyPoolRepository moneyPoolRepository;
    private final PortfolioService portfolioService;

    @Autowired
    public MoneyPoolService(MoneyPoolRepository moneyPoolRepository, @Lazy PortfolioService portfolioService) {
        this.moneyPoolRepository = moneyPoolRepository;
        this.portfolioService = portfolioService;
    }

    @Override
    @Transactional
    public void save (MoneyPool moneyPool) { moneyPoolRepository.save(moneyPool); }

    @Override
    public MoneyPool findByPortfolioType(PortfolioTypeEnum portfolioTypeEnum) {
        return moneyPoolRepository.findByPortfolioType(portfolioTypeEnum);
    }

    @Override
    public BigDecimal getUnitPriceByPortfolioType(PortfolioTypeEnum portfolioTypeEnum) {
        return findByPortfolioType(portfolioTypeEnum).getUnitPrice();
    }

    @Override
    @Transactional
    public void updateTotalUnitQty(BigDecimal unitsQty, PortfolioTypeEnum portfolioType, boolean isAdd) {
        MoneyPool moneyPool = findByPortfolioType(portfolioType);
        if (isAdd) {
            moneyPool.setTotalUnitQty(moneyPool.getTotalUnitQty().add(unitsQty));
        } else {
            moneyPool.setTotalUnitQty(moneyPool.getTotalUnitQty().subtract(unitsQty));
        }
        save(moneyPool);
    }

    @Override
    @Transactional
    public BigDecimal updateTrade(TradeTransaction tradeTransaction) {
        BigDecimal transactionPrice = tradeTransaction.getTransactionPrice();
        BigDecimal position = tradeTransaction.getTransactionQuantity();
        BigDecimal transactionAmount = transactionPrice.multiply(position);
        MoneyPool moneyPool = findByPortfolioType(tradeTransaction.getPortfolioType());

        // Update pool balance
        BigDecimal poolBalance = moneyPool.getPoolBalance();
        if (tradeTransaction.getAction().equals("BUY")) {
            transactionAmount = transactionAmount.negate();
        }
        BigDecimal newBalance = poolBalance.add(transactionAmount);
        moneyPool.setPoolBalance(newBalance);

        // Update unit price
        moneyPool.setUnitPrice(newBalance.divide(moneyPool.getTotalUnitQty()));
        save(moneyPool);

        // Update all portfolio balance by type
        BigDecimal newUnitPrice = moneyPool.getUnitPrice();
        portfolioService.updateTrade(newUnitPrice, tradeTransaction.getPortfolioType());
        return newBalance;
    }
}
