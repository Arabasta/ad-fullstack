package com.robotrader.spring.aws.ses;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.model.*;

@Service
@ConditionalOnProperty(name = "ses.notifications.enabled", havingValue = "true")
public class Ses {

    private final SesClient sesClient;
    private final Dotenv dotenv;

    public Ses(SesClient sesClient, Dotenv dotenv) {
        this.sesClient = sesClient;
        this.dotenv = dotenv;
    }

    public void sendEmail(String subject, String message, String recipientEmail) {
        String senderEmail = dotenv.get("AWS_SES_SENDER_EMAIL", System.getenv("AWS_SES_SENDER_EMAIL"));

        Destination destination = Destination.builder().toAddresses(recipientEmail).build();
        Content subjectContent = Content.builder().data(subject).build();
        Content bodyContent = Content.builder().data(message).build();
        Body body = Body.builder().text(bodyContent).build();
        Message emailMessage = Message.builder().subject(subjectContent).body(body).build();
        SendEmailRequest request = SendEmailRequest.builder().source(senderEmail)
                .destination(destination).message(emailMessage).build();

        SendEmailResponse result = sesClient.sendEmail(request);
        System.out.println(result.messageId() + " Message sent. Status was " + result.sdkHttpResponse().statusCode());
    }
}
