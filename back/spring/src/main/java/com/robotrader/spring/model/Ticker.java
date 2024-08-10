package com.robotrader.spring.model;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.enums.TickerTypeEnum;
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
@Table(name = "ticker", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"tickerName", "portfolioType"})
})
public class Ticker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TickerTypeEnum tickerType;

    @Column(nullable = false)
    private String tickerName;

    @Enumerated(EnumType.STRING)
    private PortfolioTypeEnum portfolioType;
}
