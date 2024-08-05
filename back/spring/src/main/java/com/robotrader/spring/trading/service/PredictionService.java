package com.robotrader.spring.trading.service;

import com.robotrader.spring.aws.AwsConfig;
import com.robotrader.spring.aws.s3.S3Logger;
import com.robotrader.spring.dto.ticker.TickerDTO;
import com.robotrader.spring.dto.ticker.TickerDTOListDTO;
import com.robotrader.spring.exception.aws.TransactionRetrievalException;
import com.robotrader.spring.model.enums.TickerTypeEnum;
import com.robotrader.spring.trading.dto.IPredictionServiceDTO;
import com.robotrader.spring.trading.dto.PredictionDTO;
import com.robotrader.spring.trading.dto.PredictionDTOListDTO;
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
    private final WebClient fastapiWebClient;
    private static final Logger logger = LoggerFactory.getLogger(PredictionService.class);

    public PredictionService(@Value("${AWS_S3_MODEL_BUCKET_NAME}") String awsS3ModelBucketName,
                             @Value("${BACK_FASTAPI_URL}") String backFastapiUrl,
                             WebClient.Builder webClientBuilder) {
        this.AWS_S3_MODEL_BUCKET_NAME = awsS3ModelBucketName;
        this.fastapiWebClient = webClientBuilder
                .baseUrl(backFastapiUrl)
                .build();
    }

    public PredictionDTO byPredictionDtoBacktest(PredictionDTO predictionDTO) {
        String api = "/api/v1/predict/ticker/backtest";
        Mono<PredictionDTO> stream = fastapiMonoStream(api, predictionDTO, PredictionDTO.class);
        return stream.block();
    }

    public PredictionDTO byTickerDtoLive(TickerDTO tickerDTO) throws IOException {
        String api = "/api/v1/predict/ticker/live";
        Mono<PredictionDTO> stream = fastapiMonoStream(api, tickerDTO, PredictionDTO.class);
        return stream.block();
    }

    // todo: low priority, since trading side are using individual TickerDTOs, not list.
    public PredictionDTOListDTO byTickerDtoListDtoLive(TickerDTOListDTO tickerDTOListDTO) throws IOException {
        // 1. Build TickerDTOListDTO into json
        // 2. Send json via HTTP Request to fastapi backend api
        // 3. Wait for predictions, and return
        List<TickerDTO> tickerDTOList = tickerDTOListDTO.getTickerDTOList();
        if (tickerDTOList.isEmpty()) {
            throw new IOException("Ticker list is empty");
        }
        List<PredictionDTO> list = tickerDTOList.stream()
                .map(tickerDTO -> {
                    try {
                        return byTickerDtoLive(tickerDTO);
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
                .map(fileName -> fileName.split("\\.")[0]) // e.g., splits 'AAPL.pkl' and returns 'AAPL'
                .map(tickerName -> new TickerDTO(tickerTypeEnum, tickerName))
                .toList();

        return new TickerDTOListDTO(tickerDTOList);
    }

    private <T extends IPredictionServiceDTO> Mono<T> fastapiMonoStream(String api, IPredictionServiceDTO dto, Class<T> responseType) {
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
            throw new RuntimeException("Object should be PredictionDTO or TickerDTO. Not accepted: " + dto.toString());
        }
    }
}
