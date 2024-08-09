package com.robotrader.spring.trading.dto;

import com.robotrader.spring.dto.ticker.TickerDTO;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PredictionDTO implements IPredictionServiceDTO {
    @NotNull
    private TickerDTO tickerDTO;
    @NotNull
    private List<BigDecimal> predictions;
}
