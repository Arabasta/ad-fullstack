package com.robotrader.spring.repository;

import com.robotrader.spring.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    @Query("SELECT u FROM User u " +
            "JOIN u.customer c " +
            "JOIN c.portfolios p " +
            "WHERE p.id = :portfolioId")
    User findByPortfolioId(@Param("portfolioId") Long portfolioId);

    List<User> findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(String username, String email);
}
