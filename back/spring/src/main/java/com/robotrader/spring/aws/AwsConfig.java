package com.robotrader.spring.aws;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class AwsConfig {

    private final Dotenv dotenv = Dotenv.load();

    @Bean
    @ConditionalOnProperty(name = "s3.transaction_logging.enabled", havingValue = "true")
    public S3Client s3Client() {
        AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(
                dotenv.get("AWS_S3_ACCESS_KEY_ID"),
                dotenv.get("AWS_S3_SECRET_ACCESS_KEY")
        );
        return S3Client.builder()
                .region(Region.of(dotenv.get("AWS_S3_REGION")))
                .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                .build();
    }
}
