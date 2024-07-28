package com.robotrader.spring.repository;

import com.robotrader.spring.model.Rule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RulesRepository extends JpaRepository<Rule, Long> {
}
