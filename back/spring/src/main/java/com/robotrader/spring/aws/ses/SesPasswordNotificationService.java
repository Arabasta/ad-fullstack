package com.robotrader.spring.aws.ses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

// use ses
@Service
@ConditionalOnProperty(name = "ses.notifications.enabled", havingValue = "true")
public class SesPasswordNotificationService {

    private final Ses ses;

    @Autowired
    public SesPasswordNotificationService(Ses ses) {
        this.ses = ses;
    }

    public void sendPasswordChangeNotification(String username, String recipientEmail) {
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
