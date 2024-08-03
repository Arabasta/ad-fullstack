package com.robotrader.spring.repository;

import com.robotrader.spring.model.Ticker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TickerRepository extends JpaRepository<Ticker, Long> {
    Ticker findByTickerName(String tickerName);
    @Query("SELECT t FROM Ticker t WHERE t.tickerType = 'STOCKS'")
    List<Ticker> findAllStockTicker();
    @Query("SELECT t FROM Ticker t WHERE t.tickerType = 'CRYPTO'")
    List<Ticker> findAllCryptoTicker();
}
