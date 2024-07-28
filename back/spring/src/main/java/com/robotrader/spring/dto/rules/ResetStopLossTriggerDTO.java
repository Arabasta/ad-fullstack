package com.robotrader.spring.dto.rules;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetStopLossTriggerDTO {

    private PortfolioTypeEnum portfolioType;

    private boolean resetStopLossTrigger;
}
