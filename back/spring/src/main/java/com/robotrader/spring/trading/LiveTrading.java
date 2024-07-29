package com.robotrader.spring.trading;

import com.robotrader.spring.trading.algorithm.TradingAlgorithm;
import com.robotrader.spring.trading.dto.LiveMarketData;
import com.robotrader.spring.trading.dto.TradeTransaction;
import com.robotrader.spring.trading.service.MarketDataService;
import lombok.Setter;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class LiveTrading {
    private TradingAlgorithm tradingAlgorithm;
    private List<BigDecimal> pricePredictions;
    @Setter
    private Map<String, List<Object>> marketDataHistory;
    private LiveMarketData latestMarketData;
    private Disposable dataSubscription;
    private MarketDataService marketDataService;

    public LiveTrading(MarketDataService marketDataService) {
        this.marketDataService = marketDataService;
    }

    public void run(TradingAlgorithm tradingAlgorithm) {
        this.tradingAlgorithm = tradingAlgorithm;
        subscribeToMarketData(marketDataService.getLiveMarketDataFlux());
    }

    // Polygon's API and websocket ticker format is different. eg. X:BTCUSD vs X:BTC-USD
    private String processTicker(String ticker) {
        return ticker.replace("-","");
    }

    // Polygon's websocket ticker subscription is X:BTC-USD but response object is BTC-USD......
    private String processResponseTicker(String ticker) { return "X:" + ticker; }

    private void setupAndExecuteLiveTrade() {
        marketDataService.getHistoricalMarketData(processTicker(tradingAlgorithm.getTicker()))
                .doOnNext(this::setMarketDataHistory)
                .doOnNext(data-> tradingAlgorithm.setPriceHistory(marketDataHistory))
                .doOnNext(data -> {
                    getPricePredictions();
                    tradingAlgorithm.setPricePredictions(pricePredictions);
                })
                .doOnNext(data -> tradingAlgorithm.executeLiveTrade())
                .doOnNext(data -> saveTransaction()) //todo: live trading should not save if no trade
                .subscribe(
                        data -> System.out.println("Historical data retrieved successfully."),
                        error -> {
                            System.err.println("Error during historical data retrieval: " + error.getMessage());
                            error.printStackTrace();
                        }
                );
    }

    public void subscribeToMarketData(Flux<LiveMarketData> liveMarketDataFlux) {
        dataSubscription = liveMarketDataFlux.subscribe(
                data -> {
                    this.latestMarketData = data;
                    if (processResponseTicker(latestMarketData.getTicker()).equals(tradingAlgorithm.getTicker())) {
                        tradingAlgorithm.setCurrentPrice(latestMarketData.getC());
                        setupAndExecuteLiveTrade();
                    }

                },
                error -> {
                    System.err.println("Error in market data stream: " + error);
                    error.printStackTrace();
                },
                () -> System.out.println("Market data stream completed")
        );
    }

    public void getPricePredictions() {
        List<Object> objects = marketDataHistory.get("close");
        pricePredictions = objects.stream()
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

    public void saveTransaction() {
        // TODO: to implement
        List<TradeTransaction> trades = tradingAlgorithm.getTradeTransactions();
        TradeTransaction lastTrade = null;
        BigDecimal totalProfit = BigDecimal.ZERO;
        System.out.println("Trade Transactions: ");
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
