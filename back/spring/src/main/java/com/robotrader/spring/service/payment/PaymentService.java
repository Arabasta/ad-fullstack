package com.robotrader.spring.service.payment;

import com.robotrader.spring.exception.PaymentFailedException;
import com.robotrader.spring.service.interfaces.IPaymentService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.logging.Logger;

@Service
public class PaymentService implements IPaymentService {

    Logger logger = Logger.getLogger(PaymentService.class.getName());

    @Override
    public void processPayment(String username, BigDecimal amount) {
        logger.info("Time:" + System.currentTimeMillis() + " Processing payment for user: " +
                username + " amount: " + amount);
        // todo: implement fake payment processing
        boolean paymentSuccess = true;

        if (!paymentSuccess) {
            throw new PaymentFailedException("Payment processing failed");
        }
    }

    @Override
    public void processWithdrawal(String username, BigDecimal amount) {
        logger.info("Time:" + System.currentTimeMillis() + " Processing withdrawal for user: " +
                username + " amount: " + amount);
        // todo: implement fake withdrawal processing
        boolean withdrawal = true;

        if (!withdrawal) {
            throw new PaymentFailedException("Withdrawal processing failed");
        }
    }
}
