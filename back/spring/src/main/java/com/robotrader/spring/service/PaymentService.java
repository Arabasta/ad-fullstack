package com.robotrader.spring.service;

import com.robotrader.spring.dto.paymentWithdrawal.PaymentRequestDTO;
import com.robotrader.spring.dto.paymentWithdrawal.PaymentResponseDTO;
import com.robotrader.spring.exception.PaymentFailedException;
import com.robotrader.spring.service.interfaces.IPaymentService;
import org.springframework.stereotype.Service;

@Service
public class PaymentService implements IPaymentService {

    @Override
    public PaymentResponseDTO processPayment(PaymentRequestDTO paymentRequestDTO) {
        PaymentResponseDTO response = new PaymentResponseDTO();

        if (paymentRequestDTO.getCardNumber().contains("9")){
            response.setSuccess(false);
            throw new PaymentFailedException("Withdrawal processing failed");
        } else {
            response.setSuccess(true);
        }
        return response;
    }

}


