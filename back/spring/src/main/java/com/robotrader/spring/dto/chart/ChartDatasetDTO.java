package com.robotrader.spring.dto.chart;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
public class ChartDatasetDTO {
    private String label;
    private List<BigDecimal> data;
    private String yAxisID;
}
