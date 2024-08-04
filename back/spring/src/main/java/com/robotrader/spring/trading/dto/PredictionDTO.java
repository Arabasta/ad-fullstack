package com.robotrader.spring.trading.dto;

import com.robotrader.spring.dto.ticker.TickerDTO;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PredictionDTO {
    @NotNull
    private TickerDTO tickerDTO;
    @NotNull
    private List<BigDecimal> predictions;
}
