package com.robotrader.spring.dto.ticker;

import com.robotrader.spring.trading.dto.TickerDataDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TickerDataListDTO {
    // DTO for ticker data from API call
    private List<TickerDataDTO> tickerDataList;
}
