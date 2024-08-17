package com.robotrader.spring.trading.service;

import com.robotrader.spring.aws.AwsConfig;
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

import java.io.IOException;
import java.util.List;

@Service
public class PredictionService {

    private final String AWS_S3_MODEL_BUCKET_NAME;
    private final String API_BACK_FASTAPI_PREDICT_TICKER_BACKTEST;
    private final String API_BACK_FASTAPI_PREDICT_TICKER_LIVE;
    private final WebClient fastapiWebClient;
    private static final Logger logger = LoggerFactory.getLogger(PredictionService.class);

    public PredictionService(@Value("${AWS_S3_MODEL_BUCKET_NAME}") String awsS3ModelBucketName,
                             @Value("${API_BACK_FASTAPI_PREDICT_TICKER_BACKTEST}") String apiFastapiPredictTickerBacktest,
                             @Value("${API_BACK_FASTAPI_PREDICT_TICKER_LIVE}") String apiFastapiPredictTickerLive,
                             @Value("${BACK_FASTAPI_URL}") String backFastapiUrl,
                             WebClient.Builder webClientBuilder) {
        this.AWS_S3_MODEL_BUCKET_NAME = awsS3ModelBucketName;
        this.API_BACK_FASTAPI_PREDICT_TICKER_BACKTEST = apiFastapiPredictTickerBacktest;
        this.API_BACK_FASTAPI_PREDICT_TICKER_LIVE = apiFastapiPredictTickerLive;
        this.fastapiWebClient = webClientBuilder.baseUrl(backFastapiUrl).build();
    }

    public TickerDTOListDTO getAvailableTickers() {
        S3Logger logger = new S3Logger(new AwsConfig().s3Client());
        // Transform the list of stock names into TickerDTO and collect into TickerDTOListDTO
        List<TickerDTO> tickerDTOList = logger
                .retrieveObjectNameList(AWS_S3_MODEL_BUCKET_NAME).stream()
                .filter(filename -> filename.contains("model"))
                .map(fileName -> fileName.split("\\.")[0]) // e.g., splits 'model/AAPL.pkl' and returns 'model/AAPL'
                .map(fileName -> fileName.split("/")[1]) // e.g., splits 'model/AAPL' and returns 'AAPL'
                .map(tickerName -> {
                    if (tickerName.contains(":")) {
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
