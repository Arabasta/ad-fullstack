package com.robotrader.spring.service;

import com.robotrader.spring.dto.chart.ChartDataDTO;
import com.robotrader.spring.dto.chart.ChartDatasetDTO;
import com.robotrader.spring.service.interfaces.IChartService;
import com.robotrader.spring.trading.dto.BackTestResultDTO;
import com.robotrader.spring.trading.dto.TradeTransaction;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ChartService implements IChartService {

    public ChartDataDTO transformBackTestDTOtoChartDataDTO(BackTestResultDTO backTestResult) {
        List<Integer> labels = new ArrayList<>();
        List<BigDecimal> capitalAbsoluteData = new ArrayList<>();
        List<BigDecimal> capitalPercentChangeData = new ArrayList<>();

        BigDecimal initialCapital = backTestResult.getInitialCapitalTest();
        capitalAbsoluteData.add(initialCapital);
        BigDecimal currentCapital = initialCapital;
        BigDecimal cumulativePercentChange = BigDecimal.ZERO;
        List<TradeTransaction> tradeTransactionList = backTestResult.getTradeResults();

        for (int i = 0; i < tradeTransactionList.size(); i++) {
            ZonedDateTime firstTradeTime;
            ZonedDateTime lastTradeTime;
            if (tradeTransactionList.get(i).getAction().equals("SELL")) {
                TradeTransaction buyTransaction = tradeTransactionList.get(i - 1);
                TradeTransaction sellTransaction = tradeTransactionList.get(i);
                firstTradeTime = buyTransaction.getTransactionDateTime();
                lastTradeTime = sellTransaction.getTransactionDateTime();

                Duration elapsedTime = Duration.between(firstTradeTime, lastTradeTime);
                int elapsedMinutes = (int) elapsedTime.toMinutes();
                labels.add(elapsedMinutes);

                BigDecimal profitLossAmount = (sellTransaction.getTransactionPrice()
                        .subtract(buyTransaction.getTransactionPrice()))
                        .multiply(sellTransaction.getTransactionQuantity());

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
