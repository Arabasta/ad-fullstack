package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.chart.ChartDataDTO;
import com.robotrader.spring.trading.dto.BackTestResultDTO;

public interface IChartService {
    ChartDataDTO transformBackTestDTOtoChartDataDTO(BackTestResultDTO backTestResult);
}
