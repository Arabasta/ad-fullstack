package com.robotrader.spring.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

}
