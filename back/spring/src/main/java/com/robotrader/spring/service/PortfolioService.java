package com.robotrader.spring.service;

import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.repository.PortfolioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final RulesService rulesService;

    @Autowired
    public PortfolioService(PortfolioRepository portfolioRepository, RulesService rulesService) {
        this.portfolioRepository = portfolioRepository;
        this.rulesService = rulesService;
    }

    public void save(Portfolio portfolio) {
        portfolioRepository.save(portfolio);
    }

    @Transactional
    public List<Portfolio> initBasePortfolios() {
        List<Portfolio> portfolios = new ArrayList<>();

        for (PortfolioTypeEnum portfolioType : PortfolioTypeEnum.values()) {
            Portfolio portfolio = new Portfolio();
            portfolio.setPortfolioType(portfolioType);
            portfolio.setRules(rulesService.initBaseRules());
            save(portfolio);
            portfolios.add(portfolio);
        }

        return portfolios;
    }
}
