package com.robotrader.spring.repository;

import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    List<Portfolio> findPortfolioByPortfolioType(PortfolioTypeEnum portfolioType);
}
