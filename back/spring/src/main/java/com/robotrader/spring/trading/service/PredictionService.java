package com.robotrader.spring.trading.service;

import com.robotrader.spring.aws.s3.S3Logger;
import com.robotrader.spring.dto.ticker.TickerDTO;
import com.robotrader.spring.dto.ticker.TickerDTOListDTO;
import com.robotrader.spring.model.enums.TickerTypeEnum;
import com.robotrader.spring.trading.dto.IPredictionServiceDTO;
import com.robotrader.spring.trading.dto.PredictionDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

import java.io.IOException;
import java.util.List;

@Service
public class PredictionService {

    @Value("${aws.s3.model-bucket}")
    private String AWS_S3_MODEL_BUCKET_NAME;

    @Value("${api.back.fastapi.predict.ticket.backtest}")
    private String API_BACK_FASTAPI_PREDICT_TICKER_BACKTEST;

    @Value("${api.back.fastapi.predict.ticket.live}")
    private String API_BACK_FASTAPI_PREDICT_TICKER_LIVE;

    @Value("${back.fastapi.url}")
    private String backFastapiUrl;

    private final WebClient fastapiWebClient;
    private static final Logger logger = LoggerFactory.getLogger(PredictionService.class);

    public PredictionService(WebClient.Builder webClientBuilder) {

        this.fastapiWebClient = webClientBuilder.baseUrl("http://localhost:8000").build();
    }
    @Value("${aws.s3.access-key-id}")
    private String s3AccessKeyId;

    @Value("${aws.s3.secret-access-key}")
    private String s3SecretAccessKey;

    @Value("${aws.s3.region}")
    private String s3Region;

    public S3Client s3Client() {
        AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(s3AccessKeyId, s3SecretAccessKey);

        return S3Client.builder()
                .region(Region.of(s3Region))
                .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                .build();
    }
    public TickerDTOListDTO getAvailableTickers() {
        S3Logger logger = new S3Logger(s3Client());
        // Transform the list of stock names into TickerDTO and collect into TickerDTOListDTO
        List<TickerDTO> tickerDTOList = logger
                .retrieveObjectNameList(AWS_S3_MODEL_BUCKET_NAME).stream()
                .filter(filename -> filename.contains("model"))
                .map(fileName -> fileName.split("\\.")[0]) // e.g., splits 'model/AAPL.pkl' and returns 'model/AAPL'
                .map(fileName -> fileName.split("/")[1]) // e.g., splits 'model/AAPL' and returns 'AAPL'
                .map(tickerName -> {
                    if (tickerName.contains(":")) {  //todo: our crypto names are e.g., 'X:BTCUSD'. check if this is robust enough.
                        return new TickerDTO(TickerTypeEnum.CRYPTO, tickerName, null);
                    } else {
                        return new TickerDTO(TickerTypeEnum.STOCKS, tickerName, null);
                    }
                })
                .toList();

        return new TickerDTOListDTO(tickerDTOList);
    }

    public Mono<PredictionDTO> byPredictionDtoBacktest(PredictionDTO predictionDTO) throws IOException {
        return fastapiMonoStream(API_BACK_FASTAPI_PREDICT_TICKER_BACKTEST, predictionDTO, PredictionDTO.class);
    }

    public Mono<PredictionDTO> byTickerDtoLive(TickerDTO tickerDTO) throws IOException {
        return fastapiMonoStream(API_BACK_FASTAPI_PREDICT_TICKER_LIVE, tickerDTO, PredictionDTO.class);
    }

    // returns Mono for consumer to subscribe to.
    private <T extends IPredictionServiceDTO> Mono<T> fastapiMonoStream(String api, IPredictionServiceDTO dto, Class<T> responseType) throws IOException {
        if (dto instanceof PredictionDTO || dto instanceof TickerDTO) {
            return fastapiWebClient.post()
                    .uri(uriBuilder -> uriBuilder.path(api).build())
                    .bodyValue(dto)
                    .retrieve()
                    .onStatus(HttpStatusCode::is4xxClientError, response -> {
                        logger.error("4xx error occurred for object: {}", dto);
                        return Mono.error(new RuntimeException("4xx error"));
                    })
                    .onStatus(HttpStatusCode::is5xxServerError, response -> {
                        logger.error("5xx error occurred for object: {}", dto);
                        return Mono.error(new RuntimeException("5xx error"));
                    })
                    .bodyToMono(responseType);
        } else {
            throw new IOException("Object should be PredictionDTO or TickerDTO. Not accepted: " + dto.toString());
        }
    }
}
