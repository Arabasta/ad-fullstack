package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.model.MoneyPool;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.trading.dto.TradeTransaction;
import jakarta.transaction.Transactional;

import java.math.BigDecimal;

public interface IMoneyPoolService {
    void save (MoneyPool moneyPool);
    MoneyPool findByPortfolioType(PortfolioTypeEnum portfolioTypeEnum);

    BigDecimal getUnitPriceByPortfolioType(PortfolioTypeEnum portfolioTypeEnum);

    void updateTotalUnitQty(BigDecimal newUnitsToAdd, PortfolioTypeEnum portfolioType, boolean isAdd);

    BigDecimal updateTrade(TradeTransaction tradeTransaction);
}
