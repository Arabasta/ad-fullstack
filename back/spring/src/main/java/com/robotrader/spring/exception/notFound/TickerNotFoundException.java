package com.robotrader.spring.exception.notFound;

public class TickerNotFoundException extends NotFoundException{
    public TickerNotFoundException(String message) {
        super(message);
    }
}
