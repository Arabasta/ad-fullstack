package com.robotrader.spring.aws.sns;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.PublishRequest;
import software.amazon.awssdk.services.sns.model.PublishResponse;

@Service
@ConditionalOnProperty(name = "sns.notifications.enabled", havingValue = "true")
public class Sns {

    private final SnsClient snsClient;

    @Value("${aws.sns.topic-arn}")
    private String topicArn;

    public Sns(SnsClient snsClient) {
        this.snsClient = snsClient;
    }

    public void sendEmail(String subject, String message) {
        PublishRequest request = PublishRequest.builder()
                .subject(subject)
                .message(message)
                .topicArn(topicArn)
                .build();

        PublishResponse result = snsClient.publish(request);
        System.out.println(result.messageId() + " Message sent. Status was " + result.sdkHttpResponse().statusCode());
    }
}
