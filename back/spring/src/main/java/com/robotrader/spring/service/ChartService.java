package com.robotrader.spring.service;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.robotrader.spring.dto.chart.ChartDataDTO;
import com.robotrader.spring.dto.chart.ChartDatasetDTO;
import com.robotrader.spring.model.log.PortfolioHistoryLog;
import com.robotrader.spring.service.interfaces.IChartService;
import com.robotrader.spring.trading.dto.BackTestResultDTO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class ChartService implements IChartService {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

    @Override
    public ChartDataDTO transformBackTestDTOtoChartDataDTO(BackTestResultDTO backTestResult, int amount) {
        List<LocalDateTime> labels = new ArrayList<>();
        List<BigDecimal> capitalAbsoluteData = new ArrayList<>();
        List<BigDecimal> percentChangeList = new ArrayList<>();
        List<BigDecimal> capitalPercentChangeData = new ArrayList<>();

        BigDecimal initialCapital = backTestResult.getInitialCapitalTest();
        BigDecimal initialAmount = BigDecimal.valueOf(amount);
        BigDecimal newAmount;
        BigDecimal cumulativePercentChange = BigDecimal.ZERO;
        capitalAbsoluteData.add(initialAmount);
        capitalPercentChangeData.add(cumulativePercentChange);
        percentChangeList.add(BigDecimal.ZERO);

        List<ObjectNode> tradeTransactionList = backTestResult.getTradeResults();
        if (!tradeTransactionList.isEmpty()) {
            ObjectNode firstTransaction = tradeTransactionList.get(0);
            LocalDateTime initialTime = LocalDateTime.parse(firstTransaction.get("transactionDateTime").asText(), DATE_TIME_FORMATTER);
            labels.add(initialTime);
        }

        // Calculate results of a complete transaction (buy+sell)
        for (int i = 1; i < tradeTransactionList.size(); i++) {
            if (tradeTransactionList.get(i).get("action").asText().equals("SELL")) {
                ObjectNode buyTransaction = tradeTransactionList.get(i - 1);
                ObjectNode sellTransaction = tradeTransactionList.get(i);
                LocalDateTime lastTradeTime = LocalDateTime.parse(sellTransaction.get("transactionDateTime").asText(), DATE_TIME_FORMATTER);

                labels.add(lastTradeTime);

                BigDecimal buyPrice = new BigDecimal(buyTransaction.get("transactionPrice").asText());
                BigDecimal sellPrice = new BigDecimal(sellTransaction.get("transactionPrice").asText());
                BigDecimal quantity = new BigDecimal(sellTransaction.get("transactionQuantity").asText());

                BigDecimal profitLossAmount = sellPrice.subtract(buyPrice).multiply(quantity);

                BigDecimal percentChange = profitLossAmount
                        .divide(initialCapital,4, RoundingMode.HALF_UP)
                        .multiply(BigDecimal.valueOf(100));
                percentChangeList.add(percentChange);


            }
        }
        // Need to sort the 3 lists according to timestamp as the back test results DTO are arranged by ticker type to determine complete transaction
        List<Integer> indices = IntStream.range(0, labels.size())
                .boxed()
                .sorted(Comparator.comparing(labels::get))
                .collect(Collectors.toList());

        List<LocalDateTime> sortedLabels = new ArrayList<>();
        List<BigDecimal> sortedPercentChangeList = new ArrayList<>();

        for (int index : indices) {
            sortedLabels.add(labels.get(index));
            sortedPercentChangeList.add(percentChangeList.get(index));
        }

        for (int i = 1; i < sortedPercentChangeList.size(); i++) {
            cumulativePercentChange = cumulativePercentChange.add(sortedPercentChangeList.get(i));
            capitalPercentChangeData.add(cumulativePercentChange.setScale(2, RoundingMode.HALF_UP));

            newAmount = initialAmount.add(initialAmount.multiply(cumulativePercentChange.divide(BigDecimal.valueOf(100), RoundingMode.HALF_UP))).setScale(2, RoundingMode.HALF_UP);
            capitalAbsoluteData.add(newAmount);
        }

        ChartDatasetDTO capitalDataset = new ChartDatasetDTO("Capital", capitalAbsoluteData, "y-axis-1");
        ChartDatasetDTO percentChangeDataset = new ChartDatasetDTO("Performance", capitalPercentChangeData, "y-axis-2");

        return new ChartDataDTO(sortedLabels, Arrays.asList(capitalDataset, percentChangeDataset));
    }

    @Override
    public ChartDataDTO transformPortfolioHistoryLogtoChartDataDTO(List<PortfolioHistoryLog> logs) {
        List<LocalDateTime> labels = new ArrayList<>();
        List<BigDecimal> capitalAbsoluteData = new ArrayList<>();
        List<BigDecimal> capitalPercentChangeData = new ArrayList<>();

        // Empty chart
        if (logs.isEmpty()) {
            return new ChartDataDTO(labels, new ArrayList<>());
        }

        // Sort logs by timestamp
        logs.sort(Comparator.comparing(PortfolioHistoryLog::getTimestamp));

        labels.add(logs.get(0).getTimestamp());
        capitalPercentChangeData.add(BigDecimal.ZERO);
        BigDecimal initialCapital = logs.get(0).getCurrentValue();
        capitalAbsoluteData.add(initialCapital);


        for (int i = 1; i < logs.size(); i++) {
            PortfolioHistoryLog log = logs.get(i);

            labels.add(log.getTimestamp());
            capitalAbsoluteData.add(log.getCurrentValue());

            // Calculate percent change
            BigDecimal percentChange = log.getCurrentValue()
                    .subtract(initialCapital)
                    .divide(initialCapital, 4, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100))
                    .setScale(2, RoundingMode.HALF_UP);
            capitalPercentChangeData.add(percentChange);
        }

        ChartDatasetDTO capitalDataset = new ChartDatasetDTO("Portfolio Value", capitalAbsoluteData, "y-axis-1");
        ChartDatasetDTO percentChangeDataset = new ChartDatasetDTO("Performance", capitalPercentChangeData, "y-axis-2");

        return new ChartDataDTO(labels, Arrays.asList(capitalDataset, percentChangeDataset));
    }
}
