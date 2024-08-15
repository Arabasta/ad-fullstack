package com.robotrader.spring.aws;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.sns.SnsClient;

@Configuration
public class AwsConfig {

    @Value("${aws.s3.access-key-id}")
    private String s3AccessKeyId;

    @Value("${aws.s3.secret-access-key}")
    private String s3SecretAccessKey;

    @Value("${aws.s3.region}")
    private String s3Region;

    @Value("${aws.sns.access-key-id}")
    private String snsAccessKeyId;

    @Value("${aws.sns.secret-access-key}")
    private String snsSecretAccessKey;

    @Value("${aws.sns.region}")
    private String snsRegion;

    @Value("${aws.ses.access-key-id}")
    private String sesAccessKeyId;

    @Value("${aws.ses.secret-access-key}")
    private String sesSecretAccessKey;

    @Value("${aws.ses.region}")
    private String sesRegion;

    @Bean
    public S3Client s3Client() {
        AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(s3AccessKeyId, s3SecretAccessKey);

        return S3Client.builder()
                .region(Region.of(s3Region))
                .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                .build();
    }

    @Bean
    @ConditionalOnProperty(name = "sns.notifications.enabled", havingValue = "true")
    public SnsClient snsClient() {
        AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(snsAccessKeyId, snsSecretAccessKey);

        return SnsClient.builder()
                .region(Region.of(snsRegion))
                .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                .build();
    }

    @Bean
    @ConditionalOnProperty(name = "ses.notifications.enabled", havingValue = "true")
    public SesClient sesClient() {
        AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(sesAccessKeyId, sesSecretAccessKey);

        return SesClient.builder()
                .region(Region.of(sesRegion))
                .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                .build();
    }
}
