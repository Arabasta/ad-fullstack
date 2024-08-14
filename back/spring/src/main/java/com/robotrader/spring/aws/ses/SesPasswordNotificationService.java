package com.robotrader.spring.aws.ses;

import com.robotrader.spring.model.NotificationPreferences;
import com.robotrader.spring.service.NotificationPreferencesService;
import com.robotrader.spring.service.interfaces.INotificationPreferencesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

// use ses
@Service
@ConditionalOnProperty(name = "ses.notifications.enabled", havingValue = "true")
public class SesPasswordNotificationService {

    private final Ses ses;
    private final INotificationPreferencesService notificationPreferencesService;

    @Autowired
    public SesPasswordNotificationService(Ses ses, NotificationPreferencesService notificationPreferencesService) {
        this.ses = ses;
        this.notificationPreferencesService = notificationPreferencesService;
    }

    public void sendPasswordChangeNotification(String username, String recipientEmail) {
        NotificationPreferences notificationPreferences = notificationPreferencesService.getNotificationPreferences(username);
        if (notificationPreferences.getPasswordChangeNotification() != null && !notificationPreferences.getPasswordChangeNotification()) {
            return;
        }

        String subject = "Security Alert: Your Password Has Been Changed";
        String message = String.format(
                """
                        Dear %s,

                        This is a notification that the password associated with your account was recently changed.

                        If you made this change, you can safely disregard this email.
                        If you did not change your password, please contact our support immediately to secure your account.

                        Thank you,
                        FourQuant.ai Team
                        
                        Please do not reply directly to this email. For any questions or concerns, please contact us at https://keiapp.me/support
                        """,
                username
        );

        ses.sendEmail(subject, message, recipientEmail);
    }
}
