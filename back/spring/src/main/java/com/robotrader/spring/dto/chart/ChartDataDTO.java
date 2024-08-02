package com.robotrader.spring.dto.chart;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ChartDataDTO {
    private List<Integer> labels;
    private List<ChartDatasetDTO> datasets;
}

