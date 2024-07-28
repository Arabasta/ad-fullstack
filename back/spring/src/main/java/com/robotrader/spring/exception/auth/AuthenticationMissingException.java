package com.robotrader.spring.exception.auth;

public class AuthenticationMissingException extends RuntimeException {
    public AuthenticationMissingException(String message) {
        super(message);
    }
}
