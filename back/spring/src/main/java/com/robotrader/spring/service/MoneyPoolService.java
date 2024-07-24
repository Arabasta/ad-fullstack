package com.robotrader.spring.service;

import com.robotrader.spring.interfaces.IMoneyPoolService;
import com.robotrader.spring.model.MoneyPool;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.repository.MoneyPoolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class MoneyPoolService implements IMoneyPoolService {
    private final MoneyPoolRepository moneyPoolRepository;

    @Autowired
    public MoneyPoolService(MoneyPoolRepository moneyPoolRepository) {
        this.moneyPoolRepository = moneyPoolRepository;
    }

    @Override
    public void save (MoneyPool moneyPool) { moneyPoolRepository.save(moneyPool); }

    @Override
    public MoneyPool findByPortfolioType(PortfolioTypeEnum portfolioTypeEnum) {
        return moneyPoolRepository.findByPortfolioType(portfolioTypeEnum);
    }
}
