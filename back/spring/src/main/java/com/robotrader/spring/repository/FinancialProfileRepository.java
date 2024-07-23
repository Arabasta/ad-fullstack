package com.robotrader.spring.repository;

import com.robotrader.spring.model.FinancialProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FinancialProfileRepository extends JpaRepository<FinancialProfile, Long> {
}
