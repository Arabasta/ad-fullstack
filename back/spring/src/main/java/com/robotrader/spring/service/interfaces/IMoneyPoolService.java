package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.model.MoneyPool;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;

public interface IMoneyPoolService {
    void save (MoneyPool moneyPool);
    MoneyPool findByPortfolioType(PortfolioTypeEnum portfolioTypeEnum);
}
