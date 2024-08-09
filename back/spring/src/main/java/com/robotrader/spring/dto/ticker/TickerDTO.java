package com.robotrader.spring.dto.ticker;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.enums.TickerTypeEnum;
import com.robotrader.spring.trading.dto.IPredictionServiceDTO;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TickerDTO implements IPredictionServiceDTO {

    @Enumerated(EnumType.STRING)
    private TickerTypeEnum tickerType;

    @NotBlank
    private String tickerName;

    @Enumerated(EnumType.STRING)
    private PortfolioTypeEnum portfolioType;
}
