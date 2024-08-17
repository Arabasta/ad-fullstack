package com.robotrader.spring.trading.dto;

import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BackTestResultDTO {
    private BigDecimal initialCapitalTest;
    private List<ObjectNode> tradeResults;
}
