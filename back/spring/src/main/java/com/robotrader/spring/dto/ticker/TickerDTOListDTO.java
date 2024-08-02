package com.robotrader.spring.dto.ticker;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TickerDTOListDTO {
    // DTO for Ticker entity
    private List<TickerDTO> tickerDTOList;
}
