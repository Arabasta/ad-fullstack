package com.robotrader.spring.service;

import com.robotrader.spring.model.Rules;
import com.robotrader.spring.repository.RulesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RulesService {

    private final RulesRepository rulesRepository;

    @Autowired
    public RulesService(RulesRepository rulesRepository) {
        this.rulesRepository = rulesRepository;
    }

    public void save(Rules rules) {
        rulesRepository.save(rules);
    }

    public Rules initBaseRules() {
        Rules rules = new Rules();
        save(rules);
        return rules;
    }
}
