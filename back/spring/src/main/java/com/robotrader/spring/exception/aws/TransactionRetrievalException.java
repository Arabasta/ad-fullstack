package com.robotrader.spring.exception.aws;

public class TransactionRetrievalException extends RuntimeException {
    public TransactionRetrievalException(String message) {
        super(message);
    }
}
