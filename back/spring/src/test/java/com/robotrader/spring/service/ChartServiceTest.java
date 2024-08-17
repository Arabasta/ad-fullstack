package com.robotrader.spring.service;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.robotrader.spring.dto.chart.ChartDataDTO;
import com.robotrader.spring.dto.chart.ChartDatasetDTO;
import com.robotrader.spring.model.log.PortfolioHistoryLog;
import com.robotrader.spring.trading.dto.BackTestResultDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class ChartServiceTest {

    private ChartService chartService;

    @BeforeEach
    void setUp() {
        chartService = new ChartService();
    }

    @Test
    void testTransformBackTestDTOtoChartDataDTO_Success() {
        BackTestResultDTO backTestResultDTO = new BackTestResultDTO();
        backTestResultDTO.setInitialCapitalTest(BigDecimal.valueOf(10000));

        List<ObjectNode> tradeResults = new ArrayList<>();
        JsonNodeFactory factory = JsonNodeFactory.instance;

        ObjectNode buyTransaction = factory.objectNode();
        buyTransaction.put("transactionDateTime", "20240101080000");
        buyTransaction.put("action", "BUY");
        buyTransaction.put("transactionPrice", "100");
        buyTransaction.put("transactionQuantity", "10");

        ObjectNode sellTransaction = factory.objectNode();
        sellTransaction.put("transactionDateTime", "20240102080000");
        sellTransaction.put("action", "SELL");
        sellTransaction.put("transactionPrice", "110");
        sellTransaction.put("transactionQuantity", "10");

        tradeResults.add(buyTransaction);
        tradeResults.add(sellTransaction);

        backTestResultDTO.setTradeResults(tradeResults);

        ChartDataDTO chartDataDTO = chartService.transformBackTestDTOtoChartDataDTO(backTestResultDTO, 10000);

        assertNotNull(chartDataDTO);

        ChartDatasetDTO capitalDataset = chartDataDTO.getDatasets().get(0);
        ChartDatasetDTO percentChangeDataset = chartDataDTO.getDatasets().get(1);

        assertEquals("Capital", capitalDataset.getLabel());
        assertEquals("Performance", percentChangeDataset.getLabel());
    }

    @Test
    void testTransformPortfolioHistoryLogtoChartDataDTO_Success() {
        List<PortfolioHistoryLog> logs = new ArrayList<>();

        PortfolioHistoryLog log1 = new PortfolioHistoryLog();
        log1.setTimestamp(LocalDateTime.of(2024, 1, 1, 8, 0));
        log1.setCurrentValue(BigDecimal.valueOf(10000));
        log1.setLogType("Trade");

        PortfolioHistoryLog log2 = new PortfolioHistoryLog();
        log2.setTimestamp(LocalDateTime.of(2024, 1, 2, 8, 0));
        log2.setCurrentValue(BigDecimal.valueOf(11000));
        log2.setLogType("Trade");

        logs.add(log1);
        logs.add(log2);

        ChartDataDTO chartDataDTO = chartService.transformPortfolioHistoryLogtoChartDataDTO(logs);

        assertNotNull(chartDataDTO);
        assertEquals(2, chartDataDTO.getLabels().size());
        assertEquals("2024-01-01T08:00", chartDataDTO.getLabels().get(0).toString());
        assertEquals("2024-01-02T08:00", chartDataDTO.getLabels().get(1).toString());

        ChartDatasetDTO capitalDataset = chartDataDTO.getDatasets().get(0);
        ChartDatasetDTO percentChangeDataset = chartDataDTO.getDatasets().get(1);

        assertEquals("Portfolio Value", capitalDataset.getLabel());
        assertEquals("Performance", percentChangeDataset.getLabel());

        assertEquals(BigDecimal.valueOf(10000), capitalDataset.getData().get(0));
        assertEquals(BigDecimal.valueOf(11000), capitalDataset.getData().get(1));
    }
}
