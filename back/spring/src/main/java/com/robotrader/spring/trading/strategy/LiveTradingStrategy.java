package com.robotrader.spring.trading.strategy;

import com.robotrader.spring.trading.algorithm.TradingAlgorithm;
import com.robotrader.spring.trading.dto.LiveMarketData;
import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.interfaces.TradingStrategy;
import com.robotrader.spring.trading.service.MarketDataService;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class LiveTradingStrategy implements TradingStrategy {
    private LiveMarketData latestMarketData;
    private Disposable dataSubscription;
    private List<TradeTransaction> tradeTransactions = new ArrayList<>();

    @Override
    public void execute(TradingAlgorithm tradingAlgorithm, MarketDataService marketDataService) {
        dataSubscription = marketDataService.getLiveMarketDataFlux().subscribe(
                data -> {
                    this.latestMarketData = data;
                    if (processResponseTicker(latestMarketData.getTicker()).equals(tradingAlgorithm.getTicker())) {
                        tradingAlgorithm.setCurrentPrice(latestMarketData.getC());
                        setupAndExecuteLiveTrade(tradingAlgorithm, marketDataService);
                    }
                },
                error -> {
                    System.err.println("Error in market data stream: " + error);
                    error.printStackTrace();
                },
                () -> System.out.println("Market data stream completed")
        );
    }

    @Override
    public void processTrade(TradeTransaction trade) {
        tradeTransactions.add(trade); //todo: replace with S3 write
    }

    // Polygon's API and websocket ticker format is different. eg. X:BTCUSD vs X:BTC-USD
    @Override
    public String processTicker(String ticker) {
        return ticker.replace("-","");
    }

    // Polygon's websocket ticker subscription is X:BTC-USD but response object is BTC-USD......
    private String processResponseTicker(String ticker) { return "X:" + ticker; }

    private void setupAndExecuteLiveTrade(TradingAlgorithm tradingAlgorithm, MarketDataService marketDataService) {
        marketDataService.getHistoricalMarketData(processTicker(tradingAlgorithm.getTicker()))
                .doOnNext(data-> tradingAlgorithm.setPriceHistory(data))
                .doOnNext(data -> tradingAlgorithm.setPricePredictions(getPricePredictions(data)))
                .doOnNext(data -> {
                    TradeTransaction lastTransactionBeforeExecution = tradingAlgorithm.getLastTradeTransaction();
                    tradingAlgorithm.executeLiveTrade();
                    TradeTransaction newTransaction = tradingAlgorithm.getLastTradeTransaction();

                    // Only process the trade if a new transaction was created
                    if (newTransaction != null && !newTransaction.equals(lastTransactionBeforeExecution)) {
                        processTrade(newTransaction);
                    }
                })
                .subscribe(
                        data -> System.out.println("Historical data retrieved successfully."),
                        error -> {
                            System.err.println("Error during historical data retrieval: " + error.getMessage());
                            error.printStackTrace();
                        }
                );
    }

    public List<BigDecimal> getPricePredictions(Map<String, List<Object>> marketDataHistory) {
        List<Object> objects = marketDataHistory.get("close");
        return objects.stream()
                .map(price -> (BigDecimal) price)
                .collect(Collectors.toList()); //TODO: Predictions == history for now
    }

    public void stop() {
        unsubscribeFromMarketData();
    }

    // todo: is it possible to unsub for 1 ticker only? or need to resub
    public void unsubscribeFromMarketData() {
        if (dataSubscription != null && !dataSubscription.isDisposed()) {
            dataSubscription.dispose();
        }
    }

    public void printTrade(List<TradeTransaction> trades) {
        TradeTransaction lastTrade = null;
        BigDecimal totalProfit = BigDecimal.ZERO;
        System.out.println("Trade Transactions: ");
        if (trades != null && !trades.isEmpty()) {
            for (TradeTransaction trade : trades) {
                System.out.println(trade);
                if (trade.getAction().equals("SELL")) {
                    BigDecimal profitPerQty = trade.getTransactionPrice().subtract(lastTrade.getTransactionPrice());
                    BigDecimal subtotalProfit = profitPerQty.multiply(trade.getTransactionQuantity());
                    totalProfit = totalProfit.add(subtotalProfit);
                    System.out.println("Profit: " + subtotalProfit);
                } else if (trade.getAction().equals("BUY")) {
                    lastTrade = trade;
                }
            }
            System.out.println("Total Profit: " + totalProfit);
        }
    }
}
