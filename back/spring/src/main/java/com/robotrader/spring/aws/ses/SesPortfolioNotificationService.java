package com.robotrader.spring.aws.ses;

import com.robotrader.spring.model.NotificationPreferences;
import com.robotrader.spring.service.NotificationPreferencesService;
import com.robotrader.spring.service.interfaces.INotificationPreferencesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@ConditionalOnProperty(name = "ses.notifications.enabled", havingValue = "true")
public class SesPortfolioNotificationService {

    private final Ses ses;
    private final INotificationPreferencesService notificationPreferencesService;

    @Autowired
    public SesPortfolioNotificationService(Ses ses, NotificationPreferencesService notificationPreferencesService) {
        this.ses = ses;
        this.notificationPreferencesService = notificationPreferencesService;
    }

    public void sendStopLossNotification(String username, String recipientEmail, String portfolioName) {
        NotificationPreferences notificationPreferences = notificationPreferencesService.getNotificationPreferences(username);
        if (notificationPreferences.getStopLossNotification() != null && !notificationPreferences.getStopLossNotification()) {
            return;
        }

        String subject = "Alert: Stop-Loss Triggered";
        String message = String.format(
                """
                Dear %s,

                The stop-loss rule has been triggered for your portfolio: %s. All funds have been withdrawn to your wallet.

                Please review your account and take necessary actions.

                Thank you,
                FourQuant Team

                Please do not reply directly to this email. For any questions or concerns, please contact us at https://keiapp.me/support
                """,
                username, portfolioName
        );

        ses.sendEmail(subject, message, recipientEmail);
    }

    public void sendRecurringAllocationNotification(String username, String recipientEmail, String portfolioName, BigDecimal amount) {
        NotificationPreferences notificationPreferences = notificationPreferencesService.getNotificationPreferences(username);
        if (notificationPreferences.getRecurringDepositNotification() != null && !notificationPreferences.getRecurringDepositNotification()) {
            return;
        }

        String subject = "Notification: Recurring Allocation Executed";
        String message = String.format(
                """
                Dear %s,

                A recurring allocation of %s has been executed for your portfolio: %s.

                Thank you,
                FourQuant Team

                Please do not reply directly to this email. For any questions or concerns, please contact us at https://keiapp.me/support
                """,
                username, amount.toString(), portfolioName
        );

        ses.sendEmail(subject, message, recipientEmail);
    }
}
