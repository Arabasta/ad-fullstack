package com.robotrader.spring.aws.sns;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnProperty(name = "sns.notifications.enabled", havingValue = "true")
public class SnsPasswordNotificationService {

    private final Sns sns;

    @Autowired
    public SnsPasswordNotificationService(Sns sns) {
        this.sns = sns;
    }

    public void sendPasswordChangeNotification(String username) {
        String subject = "Security Alert: Your Password Has Been Changed";
        String message = String.format(
                "Dear %s,\n\n" +
                        "This is a notification that the password associated with your account was recently changed.\n\n" +
                        "If you made this change, you can safely disregard this email.\n" +
                        "If you did not change your password, please contact our support immediately to secure your account.\n\n" +
                        "Thank you,\n" +
                        "FourQuant Team",
                username
        );

        sns.sendEmail(subject, message);
    }
}
