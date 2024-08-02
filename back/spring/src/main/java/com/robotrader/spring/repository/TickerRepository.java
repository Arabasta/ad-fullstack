package com.robotrader.spring.repository;

import com.robotrader.spring.model.Ticker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TickerRepository extends JpaRepository<Ticker, Long> {
    Ticker findByTickerName(String tickerName);
}
