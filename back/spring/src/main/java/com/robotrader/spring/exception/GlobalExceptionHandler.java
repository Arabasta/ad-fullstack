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
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), "Resource not found");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BankDetailsNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleBankDetailsNotFoundException(BankDetailsNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), "Bank details not found");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AddressNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleAddressNotFoundException(AddressNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), "Address not found");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CustomerNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleCustomerNotFoundException(CustomerNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), "Customer not found");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(FinancialProfileNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleFinancialProfileNotFoundException(FinancialProfileNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), "Financial profile not found");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvestorProfileNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleInvestorProfileNotFoundException(InvestorProfileNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), "Investor profile not found");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PoolNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handlePoolNotFoundException(PoolNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), "Pool not found");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PortfolioNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handlePortfolioNotFoundException(PortfolioNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), "Portfolio not found");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RuleNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleRuleNotFoundException(RuleNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), "Rule not found");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleUserNotFoundException(UserNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), "User not found");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(WalletNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleWalletNotFoundException(WalletNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), "Wallet not found");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(JwtInvalidException.class)
    public ResponseEntity<ApiErrorResponse> handleJwtInvalidException(JwtInvalidException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), "JWT is invalid");
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AuthenticationMissingException.class)
    public ResponseEntity<ApiErrorResponse> handleAuthenticationMissingException(AuthenticationMissingException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), "Authentication is missing");
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(PaymentFailedException.class)
    public ResponseEntity<ApiErrorResponse> handlePaymentFailedException(PaymentFailedException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), "Payment processing failed");
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(InsufficientFundsException.class)
    public ResponseEntity<ApiErrorResponse> handleInsufficientFundsException(InsufficientFundsException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", ex.getMessage(), "Insufficient funds");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(LogParsingException.class)
    public ResponseEntity<ApiErrorResponse> handleLogParsingException(LogParsingException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", "Log parsing failed", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TransactionRetrievalException.class)
    public ResponseEntity<ApiErrorResponse> handleTransactionRetrievalException(TransactionRetrievalException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", "Transaction retrieval failed", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidPasswordException(InvalidPasswordException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", "Invalid password", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiErrorResponse> handleRuntimeException(RuntimeException ex) {
        ApiErrorResponse response = new ApiErrorResponse("error", "An error occurred", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
