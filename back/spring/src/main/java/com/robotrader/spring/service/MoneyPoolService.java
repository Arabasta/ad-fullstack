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
import java.math.RoundingMode;

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
    public BigDecimal updateFundsToMoneyPool(BigDecimal amount, PortfolioTypeEnum portfolioType, boolean isAdd) {
        BigDecimal moneyPoolUnitPrice = getUnitPriceByPortfolioType(portfolioType);
        BigDecimal unitsQty = amount.divide(moneyPoolUnitPrice, 4, RoundingMode.HALF_UP);
        MoneyPool moneyPool = findByPortfolioType(portfolioType);
        if (isAdd) {
            moneyPool.setTotalUnitQty(moneyPool.getTotalUnitQty().add(unitsQty));
            moneyPool.setPoolBalance(moneyPool.getPoolBalance().add(amount));
        } else {
            moneyPool.setTotalUnitQty(moneyPool.getTotalUnitQty().subtract(unitsQty));
            moneyPool.setPoolBalance(moneyPool.getPoolBalance().subtract(amount));
        }
        save(moneyPool);
        return unitsQty;
    }

    @Override
    @Transactional
    public BigDecimal updateTrade(TradeTransaction tradeTransaction) {
        BigDecimal transactionAmount = tradeTransaction.getTransactionAmount();
        MoneyPool moneyPool = findByPortfolioType(tradeTransaction.getPortfolioType());

        // Update pool balance
        BigDecimal poolBalance = moneyPool.getPoolBalance();
        if (tradeTransaction.getAction().equals("BUY")) {
            transactionAmount = transactionAmount.negate();
        }
        BigDecimal newBalance = poolBalance.add(transactionAmount);
        moneyPool.setPoolBalance(newBalance);

        if (tradeTransaction.getAction().equals("SELL")) {
            // Update unit price
            moneyPool.setUnitPrice(newBalance.divide(moneyPool.getTotalUnitQty(), 8, RoundingMode.HALF_UP));

            // Update all portfolio balance by type
            BigDecimal newUnitPrice = moneyPool.getUnitPrice();
            portfolioService.updateTrade(newUnitPrice, tradeTransaction.getPortfolioType());
        }
        save(moneyPool);
        return newBalance;
    }
}
