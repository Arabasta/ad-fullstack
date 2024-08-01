package com.robotrader.spring.exception;

import com.robotrader.spring.dto.general.ApiErrorResponse;
import com.robotrader.spring.exception.auth.AuthenticationMissingException;
import com.robotrader.spring.exception.auth.InvalidPasswordException;
import com.robotrader.spring.exception.auth.JwtInvalidException;
import com.robotrader.spring.exception.aws.LogParsingException;
import com.robotrader.spring.exception.aws.TransactionRetrievalException;
import com.robotrader.spring.exception.notFound.*;
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

    @ExceptionHandler(AddressNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleAddressNotFoundException(AddressNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CustomerNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleCustomerNotFoundException(CustomerNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(FinancialProfileNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleFinancialProfileNotFoundException(FinancialProfileNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvestorProfileNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleInvestorProfileNotFoundException(InvestorProfileNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PoolNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handlePoolNotFoundException(PoolNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PortfolioNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handlePortfolioNotFoundException(PortfolioNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RuleNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleRuleNotFoundException(RuleNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleUserNotFoundException(UserNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(WalletNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleWalletNotFoundException(WalletNotFoundException ex) {
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

    @ExceptionHandler(LogParsingException.class)
    public ResponseEntity<ApiErrorResponse> handleLogParsingException(LogParsingException ex) {
        ApiErrorResponse apiErrorResponse = new ApiErrorResponse("error", "Log parsing failed", ex.getMessage());
        return new ResponseEntity<>(apiErrorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TransactionRetrievalException.class)
    public ResponseEntity<ApiErrorResponse> handleTransactionRetrievalException(TransactionRetrievalException ex) {
        ApiErrorResponse apiErrorResponse = new ApiErrorResponse("error", "Transaction retrieval failed", ex.getMessage());
        return new ResponseEntity<>(apiErrorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidPasswordException(InvalidPasswordException ex) {
        ApiErrorResponse apiErrorResponse = new ApiErrorResponse("error", "Invalid password", ex.getMessage());
        return new ResponseEntity<>(apiErrorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiErrorResponse> handleRuntimeException(RuntimeException ex) {
        ApiErrorResponse apiErrorResponse = new ApiErrorResponse("error", "An error occurred", ex.getMessage());
        return new ResponseEntity<>(apiErrorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
