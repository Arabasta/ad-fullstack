package com.robotrader.spring.trading.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.robotrader.spring.aws.AwsConfig;
import com.robotrader.spring.dto.ticker.TickerDTO;
import com.robotrader.spring.trading.dto.PredictionDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class PredictionService {

    private final String AWS_S3_PREDICTION_BUCKET_NAME;
//    private final Dotenv dotenv = Dotenv.load();

    public PredictionService(@Value("${AWS_S3_PREDICTION_BUCKET_NAME}") String awsS3PredictionBucketName) {
        this.AWS_S3_PREDICTION_BUCKET_NAME = awsS3PredictionBucketName;
    }

    public PredictionDTO byTicker(TickerDTO tickerDTO) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        String tickerName = tickerDTO.getTickerName().toUpperCase();
        return mapper.readValue(readJsonFromS3Bucket(tickerName), PredictionDTO.class);
    }

    public ObjectMapper byTickerList(List<TickerDTO> tickerDTOList) throws IOException {
        if (tickerDTOList.isEmpty()) {
            throw new IOException("Ticker list is empty");
        }
        // todo: alvin implement this
        return new ObjectMapper();
    }

    private String readJsonFromS3Bucket(String keyName) {
        try {
            AwsConfig config = new AwsConfig();
            S3Client s3 = config.s3Client();

            GetObjectRequest objectRequest = GetObjectRequest
                    .builder()
                    .key(keyName + ".json")
                    .bucket(AWS_S3_PREDICTION_BUCKET_NAME)
                    .build();

            CompletableFuture<ResponseBytes<GetObjectResponse>> objectMapperCompletableFuture =
                    CompletableFuture.supplyAsync(() -> s3.getObjectAsBytes(objectRequest));

            byte[] data = objectMapperCompletableFuture.get().asByteArray();
            return new String(data);

        } catch (S3Exception e) {
            System.err.println(e.awsErrorDetails().errorMessage());
            throw new RuntimeException(e);

        } catch (ExecutionException | InterruptedException e) {
            System.err.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
