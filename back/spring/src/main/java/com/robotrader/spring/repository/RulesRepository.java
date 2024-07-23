package com.robotrader.spring.repository;

import com.robotrader.spring.model.Rules;
import org.apache.tomcat.util.digester.Rule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RulesRepository extends JpaRepository<Rules, Long> {
}
