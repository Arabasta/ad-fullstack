package com.robotrader.spring.aws.sns;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@ConditionalOnProperty(name = "sns.notifications.enabled", havingValue = "true")
public class SnsPortfolioNotificationService {

    private final Sns sns;

    @Autowired
    public SnsPortfolioNotificationService(Sns sns) {
        this.sns = sns;
    }

    public void sendStopLossNotification(String username, String portfolioName) {
        String subject = "Alert: Stop-Loss Triggered";
        String message = String.format(
                "Dear %s,\n\n" +
                        "The stop-loss rule has been triggered for your portfolio: %s. All funds have been withdrawn to your wallet.\n\n" +
                        "Please review your account and take necessary actions.\n\n" +
                        "Thank you,\n" +
                        "FourQuant Team",
                username, portfolioName
        );

        sns.sendEmail(subject, message);
    }

    public void sendRecurringAllocationNotification(String username, String portfolioName, BigDecimal amount) {
        String subject = "Notification: Recurring Allocation Executed";
        String message = String.format(
                "Dear %s,\n\n" +
                        "A recurring allocation of %s has been executed for your portfolio: %s.\n\n" +
                        "Thank you,\n" +
                        "FourQuant Team",
                username, amount.toString(), portfolioName
        );

        sns.sendEmail(subject, message);
    }
}
