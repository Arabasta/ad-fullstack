package com.robotrader.spring.dto.ticker;

import com.robotrader.spring.trading.dto.IPredictionServiceDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TickerDTOListDTO implements IPredictionServiceDTO {
    // DTO for Ticker DTO
    private List<TickerDTO> tickerDTOList;
}
