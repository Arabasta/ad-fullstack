package com.robotrader.spring.aws.ses;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.model.*;

@Service
@ConditionalOnProperty(name = "ses.notifications.enabled", havingValue = "true")
public class Ses {

    private final SesClient sesClient;

    @Value("${aws.ses.sender-email}")
    private String senderEmail;

    public Ses(SesClient sesClient) {
        this.sesClient = sesClient;
    }


    public void sendEmail(String subject, String message, String recipientEmail) {
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
