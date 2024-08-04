package com.robotrader.spring.exception.notFound;

public class BankDetailsNotFoundException extends RuntimeException {
    public BankDetailsNotFoundException(String message) {
        super(message);
    }
}
