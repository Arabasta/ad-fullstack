package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.paymentWithdrawal.PaymentRequestDTO;
import com.robotrader.spring.dto.paymentWithdrawal.PaymentResponseDTO;

public interface IPaymentService {
    PaymentResponseDTO processPayment(PaymentRequestDTO paymentRequestDTO);
}
