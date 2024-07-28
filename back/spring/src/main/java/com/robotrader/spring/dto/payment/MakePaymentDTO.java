package com.robotrader.spring.dto.payment;

import lombok.Getter;

import java.math.BigDecimal;

// todo: implement payment processing add something here or waht idk
@Getter
public class MakePaymentDTO {
    private String username;
    private BigDecimal amount;
}
