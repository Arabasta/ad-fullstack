package com.robotrader.spring.dto.chart;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class ChartDataDTO {
    private List<LocalDateTime> labels;
    private List<ChartDatasetDTO> datasets;
}

