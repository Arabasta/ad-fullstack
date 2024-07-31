package com.robotrader.spring.trading.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.robotrader.spring.aws.AwsConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class PredictionService {

    private final String AWS_S3_PREDICTION_BUCKET_NAME;

    public PredictionService(@Value("${AWS_S3_PREDICTION_BUCKET_NAME}") String awsS3PredictionBucketName) {
        this.AWS_S3_PREDICTION_BUCKET_NAME = awsS3PredictionBucketName;
    }

    public ObjectMapper byStock(String stock) throws IOException {
        if (stock.isBlank()) {
            throw new IOException("Stock is empty");
        }
        return readStockJsonFromS3Bucket(stock.trim().toUpperCase());
    }

    public ObjectMapper byStockList(List<String> list) throws IOException {
        if (list.isEmpty()) {
            throw new IOException("Stock list is empty");
        }
        // todo: alvin implement this
        return new ObjectMapper();
    }

    private ObjectMapper readStockJsonFromS3Bucket (String keyName) {

        ObjectMapper mapper = new ObjectMapper();

        try {
            AwsConfig config = new AwsConfig();
            S3Client s3 = config.s3Client();

            GetObjectRequest objectRequest = GetObjectRequest
                    .builder()
                    .key(keyName)
                    .bucket(AWS_S3_PREDICTION_BUCKET_NAME)
                    .build();

            CompletableFuture<ResponseBytes<GetObjectResponse> > objectMapperCompletableFuture =
                    CompletableFuture.supplyAsync(() -> s3.getObjectAsBytes(objectRequest));

            byte[] data = objectMapperCompletableFuture.get().asByteArray();

//            ResponseBytes<GetObjectResponse> objectBytes = s3.getObjectAsBytes(objectRequest);
//            byte[] data = objectBytes.asByteArray();
            mapper.readValue(data, String.class);

        } catch (S3Exception e) {
            System.err.println(e.awsErrorDetails().errorMessage());
            throw new RuntimeException(e);

        } catch (IOException | ExecutionException | InterruptedException e) {
            System.err.println(e.getMessage());
            throw new RuntimeException(e);
        }
        return mapper;
    }
}
