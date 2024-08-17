package com.robotrader.spring.repository;

import com.robotrader.spring.model.MoneyPool;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MoneyPoolRepository extends JpaRepository<MoneyPool, Long> {
    @Query("Select mp FROM MoneyPool mp WHERE mp.portfolioType = :portfolioType")
    MoneyPool findByPortfolioType(@Param("portfolioType") PortfolioTypeEnum portfolioTypeEnum);
}
