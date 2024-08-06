package com.robotrader.spring.controller.customer;

import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.paymentWithdrawal.PaymentRequestDTO;
import com.robotrader.spring.dto.paymentWithdrawal.PaymentResponseDTO;
import com.robotrader.spring.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/payment")
public class PaymentControllerV1 {

    private final PaymentService paymentService;

    @Autowired
    public PaymentControllerV1(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/process")
    public ResponseEntity<ApiResponse<PaymentResponseDTO>> processPayment(Authentication authentication,
                                                                          @RequestBody PaymentRequestDTO paymentRequestDTO) {
        PaymentResponseDTO response = paymentService.processPayment(paymentRequestDTO);
        if (response.isSuccess()) {
            return ResponseEntity.ok(new ApiResponse<>("success", "Payment processed successfully", response));
        } else {
            return ResponseEntity.ok(new ApiResponse<>("error", "Payment failed", response));
        }
    }

}