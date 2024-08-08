package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.chart.ChartDataDTO;
import com.robotrader.spring.model.log.PortfolioHistoryLog;
import com.robotrader.spring.trading.dto.BackTestResultDTO;

import java.util.List;

public interface IChartService {
    ChartDataDTO transformBackTestDTOtoChartDataDTO(BackTestResultDTO backTestResult);

    ChartDataDTO transformPortfolioHistoryLogtoChartDataDTO(List<PortfolioHistoryLog> logs);
}
