package com.robotrader.spring.repository;

import com.robotrader.spring.model.InvestorProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvestorProfileRepository extends JpaRepository<InvestorProfile, Long> {
}
