package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.model.MoneyPool;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.trading.dto.TradeTransaction;

import java.math.BigDecimal;

public interface IMoneyPoolService {
    void save (MoneyPool moneyPool);
    MoneyPool findByPortfolioType(PortfolioTypeEnum portfolioTypeEnum);

    BigDecimal getUnitPriceByPortfolioType(PortfolioTypeEnum portfolioTypeEnum);

    BigDecimal updateFundsToMoneyPool(BigDecimal newUnitsToAdd, PortfolioTypeEnum portfolioType, boolean isAdd);

    BigDecimal updateTrade(TradeTransaction currentTransaction, TradeTransaction lastTransaction);
}
