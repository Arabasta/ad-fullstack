package com.robotrader.spring.dto.ticker;

import com.robotrader.spring.model.Ticker;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TickerListDTO {
    // DTO for Ticker entity
    private List<Ticker> tickerList;
}
