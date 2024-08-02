package com.robotrader.spring.trading.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class CryptoLiveDataDTO extends LiveMarketDataDTO {
    private String pair; // Crypto pair

    @Override
    public String getTicker() {
        return pair;
    }
}
