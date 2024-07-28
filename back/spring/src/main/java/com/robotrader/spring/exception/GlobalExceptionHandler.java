package com.robotrader.spring.exception;

import com.robotrader.spring.dto.general.ApiErrorResponse;
import com.robotrader.spring.exception.auth.AuthenticationMissingException;
import com.robotrader.spring.exception.auth.JwtInvalidException;
import com.robotrader.spring.exception.notFound.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleNotFoundException(NotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(JwtInvalidException.class)
    public ResponseEntity<ApiErrorResponse> handleJwtInvalidException(JwtInvalidException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AuthenticationMissingException.class)
    public ResponseEntity<ApiErrorResponse> handleAuthenticationMissingException(AuthenticationMissingException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(PaymentFailedException.class)
    public ResponseEntity<String> handlePaymentFailedException(PaymentFailedException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(InsufficientFundsException.class)
    public ResponseEntity<String> handleInsufficientFundsException(InsufficientFundsException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiErrorResponse> handleRuntimeException(RuntimeException ex) {
        ApiErrorResponse apiErrorResponse = new ApiErrorResponse("error", "An error occurred", ex.getMessage());
        return new ResponseEntity<>(apiErrorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
