package com.robotrader.spring.dto.paymentWithdrawal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestDTO {

    @DecimalMin(value = "0.01", message = "Amount must be greater than zero")
    private BigDecimal amount;

    @NotBlank(message = "Card number is required")
    @Pattern(regexp = "\\d{13,19}", message = "Card number must be between 13 and 19 digits")
    private String cardNumber;

    @NotBlank(message = "Cardholder name is required")
    @Size(max = 50, message = "Cardholder name must not exceed 50 characters")
    private String cardHolderName;

    @NotBlank(message = "Card expiry month is required")
    @Pattern(regexp = "0[1-9]|1[0-2]", message = "Expiry month must be a valid month (MM)")
    private String cardExpiryMonth;

    @NotBlank(message = "Card expiry year is required")
    @Pattern(regexp = "\\d{2}", message = "Expiry year must be a valid year (YY)")
    private String cardExpiryYear;

    @NotBlank(message = "CVC is required")
    @Pattern(regexp = "\\d{3}", message = "CVC must be 3 digits")
    private String cvc;

}