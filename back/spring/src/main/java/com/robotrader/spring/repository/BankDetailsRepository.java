package com.robotrader.spring.repository;

import com.robotrader.spring.model.BankDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankDetailsRepository extends JpaRepository<BankDetails, Long> {
}
