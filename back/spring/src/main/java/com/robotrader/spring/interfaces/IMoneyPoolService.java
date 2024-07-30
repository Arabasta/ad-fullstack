package com.robotrader.spring.interfaces;

import com.robotrader.spring.model.MoneyPool;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;

import java.math.BigDecimal;

public interface IMoneyPoolService {
    void save (MoneyPool moneyPool);
    MoneyPool findByPortfolioType(PortfolioTypeEnum portfolioTypeEnum);
}
