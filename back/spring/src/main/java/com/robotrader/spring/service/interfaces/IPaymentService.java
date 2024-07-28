package com.robotrader.spring.service.interfaces;

import java.math.BigDecimal;

public interface IPaymentService {
    void processPayment(String username, BigDecimal amount);
    void processWithdrawal(String username, BigDecimal amount);
}
