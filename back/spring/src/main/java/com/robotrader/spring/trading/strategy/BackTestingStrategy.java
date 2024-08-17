package com.robotrader.spring.trading.strategy;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.robotrader.spring.dto.ticker.TickerDTO;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.model.enums.TickerTypeEnum;
import com.robotrader.spring.trading.dto.PredictionDTO;
import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.algorithm.base.TradingAlgorithmBase;
import com.robotrader.spring.trading.interfaces.TradePersistence;
import com.robotrader.spring.trading.interfaces.TradingStrategy;
import com.robotrader.spring.trading.service.HistoricalMarketDataService;
import com.robotrader.spring.trading.service.PredictionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

public class BackTestingStrategy implements TradingStrategy {
    private final TradePersistence tradePersistence;
    private final HistoricalMarketDataService historicalMarketDataService;
    private final PredictionService predictionService;
    private static final Logger logger = LoggerFactory.getLogger(BackTestingStrategy.class);
    private static final int MIN_INPUT_SIZE = 76;
    private static final int LIMIT = 5000; // API call data limit

    public BackTestingStrategy(TradePersistence tradePersistence,
                               HistoricalMarketDataService historicalMarketDataService, PredictionService predictionService) {
        this.tradePersistence = tradePersistence;
        this.historicalMarketDataService = historicalMarketDataService;
        this.predictionService = predictionService;
    }

    @Override
    public CompletableFuture<Void> execute(TradingAlgorithmBase tradingAlgorithmBase) {
        return historicalMarketDataService.getHistoricalMarketData(processTicker(tradingAlgorithmBase.getTicker()), LIMIT)
                .flatMap(data -> {
                    // Ensure runSimulation returns a Mono<Void>
                    return runSimulation(tradingAlgorithmBase, data);
                })
                .toFuture()
                .thenAccept(data -> logger.info("Backtesting completed successfully."))
                .exceptionally(error -> {
                    logger.error("Error during backtesting: {}", error.getMessage());
                    error.printStackTrace();
                    return null;
                });
    }

    @Override
    public void processTrade(TradeTransaction trade) {
        tradePersistence.saveTrade(trade);
    }

    // Polygon's API and websocket ticker format is different. eg. BTCUSD vs BTC-USD
    @Override
    public String processTicker(String ticker) {
        return ticker.replace("-","");
    }

    public Mono<Void> runSimulation(TradingAlgorithmBase tradingAlgorithmBase, Map<String, List<Object>> marketDataHistory) {
        return Mono.create(sink -> {
            // Loop through price history and execute algo, simulating progress of time
            Flux.fromIterable(marketDataHistory.get("open"))
                    .takeWhile(openPrice -> marketDataHistory.get("open").size() >= 77)
                    .concatMap(openPrice -> { // Ensures sequential running of getPricePredictions, so that it completes before the next one is run.
                        return getPricePredictions(marketDataHistory, tradingAlgorithmBase.getTicker())
                                .doOnNext(predictionDTO -> {
                                    List<BigDecimal> pricePredictions = predictionDTO.getPredictions();
                                    TradeTransaction lastTransactionBeforeExecution = tradingAlgorithmBase.getCurrentTradeTransaction();

                                    tradingAlgorithmBase.setPricePredictions(new ArrayList<>(pricePredictions));
                                    tradingAlgorithmBase.setPriceHistory(new HashMap<>(marketDataHistory));
                                    boolean isTest = true;
                                    tradingAlgorithmBase.execute(isTest);

                                    List<Object> openPrices = new ArrayList<>(marketDataHistory.get("open"));
                                    List<Object> timestamps = new ArrayList<>(marketDataHistory.get("timestamp"));
                                    List<Object> closePrices = new ArrayList<>(marketDataHistory.get("close"));
                                    List<Object> highPrices = new ArrayList<>(marketDataHistory.get("high"));
                                    List<Object> lowPrices = new ArrayList<>(marketDataHistory.get("low"));
                                    List<Object> vwPrices = new ArrayList<>(marketDataHistory.get("vw"));

                                    openPrices.remove(0);
                                    timestamps.remove(0);
                                    closePrices.remove(0);
                                    highPrices.remove(0);
                                    lowPrices.remove(0);
                                    vwPrices.remove(0);

                                    marketDataHistory.put("open", openPrices);
                                    marketDataHistory.put("timestamp", timestamps);
                                    marketDataHistory.put("close", closePrices);
                                    marketDataHistory.put("high", highPrices);
                                    marketDataHistory.put("low", lowPrices);
                                    marketDataHistory.put("vw", vwPrices);

                                    TradeTransaction newTransaction = tradingAlgorithmBase.getCurrentTradeTransaction();
                                    // Only process the trade if a new transaction was created
                                    if (newTransaction != null && !newTransaction.equals(lastTransactionBeforeExecution)) {
                                        processTrade(newTransaction);
                                    }

                                })
                                .doOnError(error -> {
                                    logger.error("Error retrieving price predictions: {}", error.getMessage());
                                    sink.error(error);
                                });
                    })
                    .subscribe(
                            null,
                            sink::error,
                            sink::success
                    );
        });
    }

    public Mono<PredictionDTO> getPricePredictions(Map<String, List<Object>> marketDataHistory, String tickerName) {
        PredictionDTO predictionDTO = new PredictionDTO();
        List<BigDecimal> historicalVW = marketDataHistory.get("vw").subList(0, MIN_INPUT_SIZE + 1)
                .stream()
                .map(obj -> new BigDecimal(obj.toString()))
                .collect(Collectors.toList());
        predictionDTO.setPredictions(historicalVW);
        TickerDTO tickerDTO = new TickerDTO();
        tickerDTO.setTickerName(processTicker(tickerName));
        tickerDTO.setTickerType(TickerTypeEnum.STOCKS);
        tickerDTO.setPortfolioType(PortfolioTypeEnum.AGGRESSIVE);
        predictionDTO.setTickerDTO(tickerDTO);
        Mono<PredictionDTO> predictionDTOMono;
        try {
            predictionDTOMono = predictionService.byPredictionDtoBacktest(predictionDTO);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return predictionDTOMono;
    }

    @Override
    public List<ObjectNode> getTradeResults() {
        List<ObjectNode> trades = tradePersistence.getAllTrades();

        // Logging of trades
        ObjectNode lastTrade = null;
        BigDecimal totalProfit = BigDecimal.ZERO;
        String tickerName = "";
        logger.info("Trade Transactions: ");
        if (trades != null && !trades.isEmpty()) {
            tickerName = trades.get(0).get("ticker").asText();
            for (ObjectNode trade : trades) {
                logger.info(trade.toString());
                String action = trade.get("action").asText();
                if ("SELL".equals(action)) {
                    if (lastTrade != null) {
                        BigDecimal sellPrice = new BigDecimal(trade.get("transactionPrice").asText());
                        BigDecimal buyPrice = new BigDecimal(lastTrade.get("transactionPrice").asText());
                        BigDecimal quantity = new BigDecimal(trade.get("transactionQuantity").asText());

                        BigDecimal profitPerQty = sellPrice.subtract(buyPrice);
                        BigDecimal subtotalProfit = profitPerQty.multiply(quantity);
                        totalProfit = totalProfit.add(subtotalProfit);
                        logger.info("{} - Profit: {}", tickerName, subtotalProfit);
                    }
                } else if ("BUY".equals(action)) {
                    lastTrade = trade;
                }
            }
            logger.info("{} - Total Profit: {}", tickerName, totalProfit);
            logger.info("{} - Total number of trades: {}", tickerName, trades.size());
        } else {
            logger.info("{} - No trade transactions", tickerName);
        }
        return trades;
    }

    @Override
    public void stop(){

    }
}