package com.robotrader.spring.repository;

import com.robotrader.spring.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface WalletRepository extends JpaRepository<Wallet, Long> {
    @Query("SELECT w FROM Wallet w " +
            "JOIN Customer c ON c.wallet.id = w.id " +
            "JOIN c.portfolios p " +
            "WHERE p.id = :portfolioId")
    Wallet findByPortfolioId(Long portfolioId);
}
