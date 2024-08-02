package com.robotrader.spring.service;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.robotrader.spring.dto.chart.ChartDataDTO;
import com.robotrader.spring.dto.chart.ChartDatasetDTO;
import com.robotrader.spring.service.interfaces.IChartService;
import com.robotrader.spring.trading.dto.BackTestResultDTO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ChartService implements IChartService {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

    public ChartDataDTO transformBackTestDTOtoChartDataDTO(BackTestResultDTO backTestResult) {
        List<Integer> labels = new ArrayList<>();
        List<BigDecimal> capitalAbsoluteData = new ArrayList<>();
        List<BigDecimal> capitalPercentChangeData = new ArrayList<>();

        BigDecimal initialCapital = backTestResult.getInitialCapitalTest();
        BigDecimal currentCapital = initialCapital;
        BigDecimal cumulativePercentChange = BigDecimal.ZERO;
        capitalAbsoluteData.add(initialCapital);
        capitalPercentChangeData.add(cumulativePercentChange);
        labels.add(0);

        List<ObjectNode> tradeTransactionList = backTestResult.getTradeResults();

        for (int i = 1; i < tradeTransactionList.size(); i++) {
            if (tradeTransactionList.get(i).get("action").asText().equals("SELL")) {
                ObjectNode buyTransaction = tradeTransactionList.get(i - 1);
                ObjectNode sellTransaction = tradeTransactionList.get(i);

                LocalDateTime firstTradeTime = LocalDateTime.parse(buyTransaction.get("transactionDateTime").asText(), DATE_TIME_FORMATTER);
                LocalDateTime lastTradeTime = LocalDateTime.parse(sellTransaction.get("transactionDateTime").asText(), DATE_TIME_FORMATTER);

                Duration elapsedTime = Duration.between(firstTradeTime, lastTradeTime);
                int elapsedMinutes = (int) elapsedTime.toMinutes();
                labels.add(elapsedMinutes);

                BigDecimal buyPrice = new BigDecimal(buyTransaction.get("transactionPrice").asText());
                BigDecimal sellPrice = new BigDecimal(sellTransaction.get("transactionPrice").asText());
                BigDecimal quantity = new BigDecimal(sellTransaction.get("transactionQuantity").asText());

                BigDecimal profitLossAmount = sellPrice.subtract(buyPrice).multiply(quantity);

                BigDecimal percentChange = profitLossAmount
                        .divide(initialCapital,10, RoundingMode.HALF_UP)
                        .multiply(BigDecimal.valueOf(100));
                cumulativePercentChange = cumulativePercentChange.add(percentChange);

                capitalPercentChangeData.add(cumulativePercentChange.setScale(2, RoundingMode.HALF_UP));


                currentCapital = currentCapital.add(profitLossAmount).setScale(2, RoundingMode.HALF_UP);
                capitalAbsoluteData.add(currentCapital);
            }
        }

        ChartDatasetDTO capitalDataset = new ChartDatasetDTO("Capital", capitalAbsoluteData, "y-axis-1");
        ChartDatasetDTO percentChangeDataset = new ChartDatasetDTO("Percent Change", capitalPercentChangeData, "y-axis-2");

        return new ChartDataDTO(labels, Arrays.asList(capitalDataset, percentChangeDataset));
    }
}
