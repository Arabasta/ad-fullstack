package com.robotrader.spring.repository;

import com.robotrader.spring.model.Pool;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PoolRepository extends JpaRepository<Pool, Long> {
}
