package com.robotrader.spring.exception.aws;

public class LogParsingException extends RuntimeException {
    public LogParsingException(String message) {
        super(message);
    }
}
