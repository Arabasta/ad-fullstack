package com.robotrader.spring.aws.sns;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.PublishRequest;
import software.amazon.awssdk.services.sns.model.PublishResponse;

@Service
@ConditionalOnProperty(name = "sns.notifications.enabled", havingValue = "true")
public class Sns {

    private final SnsClient snsClient;
    private final Dotenv dotenv;

    public Sns(SnsClient snsClient, Dotenv dotenv) {
        this.snsClient = snsClient;
        this.dotenv = dotenv;
    }

    public void sendEmail(String subject, String message) {
        String topicArn = dotenv.get("AWS_SNS_TOPIC_ARN", System.getenv("AWS_SNS_TOPIC_ARN"));

        PublishRequest request = PublishRequest.builder()
                .subject(subject)
                .message(message)
                .topicArn(topicArn)
                .build();

        PublishResponse result = snsClient.publish(request);
        System.out.println(result.messageId() + " Message sent. Status was " + result.sdkHttpResponse().statusCode());
    }
}
