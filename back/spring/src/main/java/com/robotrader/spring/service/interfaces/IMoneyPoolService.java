package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.moneyPool.MoneyPoolDTO;
import com.robotrader.spring.model.MoneyPool;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.trading.dto.TradeTransaction;
import jakarta.transaction.Transactional;

import java.math.BigDecimal;

public interface IMoneyPoolService {
    void save (MoneyPool moneyPool);
    MoneyPool findByPortfolioType(PortfolioTypeEnum portfolioTypeEnum);

    BigDecimal getUnitPriceByPortfolioType(PortfolioTypeEnum portfolioTypeEnum);

    BigDecimal updateFundsToMoneyPool(BigDecimal newUnitsToAdd, PortfolioTypeEnum portfolioType, boolean isAdd);

    BigDecimal updateTrade(TradeTransaction currentTransaction, TradeTransaction lastTransaction);

    MoneyPool create(MoneyPoolDTO moneyPoolDTO);

    void updateMoneyPoolFromDTO(MoneyPool moneyPool, MoneyPoolDTO moneyPoolDTO);

    @Transactional
    MoneyPoolDTO updateMoneyPool(MoneyPoolDTO moneyPoolDTO);
}
