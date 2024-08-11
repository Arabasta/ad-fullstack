package com.robotrader.spring.dto.backtest;

import com.robotrader.spring.model.Ticker;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class AlgorithmDTO {

    private PortfolioTypeEnum[] portfolioTypes;
    private Set<String> algorithms;
    private List<Ticker> tickerList;
}
