package com.robotrader.spring.trading.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.robotrader.spring.aws.AwsConfig;
import com.robotrader.spring.aws.s3.S3Logger;
import com.robotrader.spring.dto.ticker.TickerDTO;
import com.robotrader.spring.dto.ticker.TickerDTOListDTO;
import com.robotrader.spring.exception.aws.TransactionRetrievalException;
import com.robotrader.spring.model.enums.TickerTypeEnum;
import com.robotrader.spring.trading.dto.PredictionDTO;
import com.robotrader.spring.trading.dto.PredictionDTOListDTO;
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
    private final String AWS_S3_MODEL_BUCKET_NAME;

    public PredictionService(@Value("${AWS_S3_PREDICTION_BUCKET_NAME}") String awsS3PredictionBucketName,
                             @Value("${AWS_S3_MODEL_BUCKET_NAME}") String awsS3ModelBucketName) {
        this.AWS_S3_PREDICTION_BUCKET_NAME = awsS3PredictionBucketName;
        this.AWS_S3_MODEL_BUCKET_NAME = awsS3ModelBucketName;
    }

    public PredictionDTO byTicker(TickerDTO tickerDTO) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        String tickerName = tickerDTO.getTickerName().toUpperCase();
        // todo: call fastApi for updated predictions, instead of reading static predictions .json from s3.
        return mapper.readValue(readJsonFromS3Bucket(tickerName), PredictionDTO.class);
    }

    public PredictionDTOListDTO byTickerList(TickerDTOListDTO tickerDTOListDTO) throws IOException {
        List<TickerDTO> tickerDTOList = tickerDTOListDTO.getTickerDTOList();
        if (tickerDTOList.isEmpty()) {
            throw new IOException("Ticker list is empty");
        }
        List<PredictionDTO> list = tickerDTOList.stream()
                .map(tickerDTO -> {
                    try {
                        return byTicker(tickerDTO);
                    } catch (IOException e) {
                        throw new RuntimeException("Failed to fetch prediction for ticker: " + tickerDTO.getTickerName(), e);
                    }
                })
                .toList();
        return new PredictionDTOListDTO(list);
    }

    public TickerDTOListDTO getAvailableTickers() {
        S3Logger logger = new S3Logger(new AwsConfig().s3Client());
        /*
         * todo: implement parsing through bucket/* directories to get prefix (stock, crypto, etc.)
         * todo: hardcoded prefix to make this method functional. to implement logic to check whether retrieved object is for stock or crypto, and set TicketTypeEnum accordingly.
         * */
        String prefix = "stocks";

        TickerTypeEnum tickerTypeEnum = switch (prefix) {
            case "stocks" -> TickerTypeEnum.STOCKS;
            case "crypto" -> TickerTypeEnum.CRYPTO;
            default ->
                    throw new TransactionRetrievalException(String.format("Cannot determine TickerType from %s", AWS_S3_MODEL_BUCKET_NAME));
        };
        // Transform the list of stock names into TickerDTO and collect into TickerDTOListDTO
        List<TickerDTO> tickerDTOList = logger
                .retrieveObjectNameList(AWS_S3_MODEL_BUCKET_NAME).stream()
                .map(fileName -> fileName.split("\\.")[0]) // splits AAPL.json to AAPL
                .map(tickerName -> new TickerDTO(tickerTypeEnum, tickerName))
                .toList();

        return new TickerDTOListDTO(tickerDTOList);
    }

    // todo: to delete after implementing getting predictions from fastApi
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
