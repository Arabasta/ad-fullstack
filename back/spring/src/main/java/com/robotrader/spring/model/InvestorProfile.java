package com.robotrader.spring.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class InvestorProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer withdrawalScore;

    private Integer expenditureScore;

    private Integer knowledgeScore;

    private Integer riskScore;

    private Integer experienceScore;

    private Integer scenarioScore;

    private Integer chartScore;

    public InvestorProfile() {}

    public InvestorProfile(Integer withdrawalScore, Integer expenditureScore, Integer knowledgeScore,
                           Integer riskScore, Integer experienceScore, Integer scenarioScore, Integer chartScore) {
        this.withdrawalScore = withdrawalScore;
        this.expenditureScore = expenditureScore;
        this.knowledgeScore = knowledgeScore;
        this.riskScore = riskScore;
        this.experienceScore = experienceScore;
        this.scenarioScore = scenarioScore;
        this.chartScore = chartScore;
    }
}
