package com.robotrader.spring.dto.backtest;

import com.robotrader.spring.model.Ticker;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AlgorithmDTO {

    private PortfolioTypeEnum[] portfolioTypes;
    private List<String> algorithms;
    private List<Ticker> tickerList;
}
