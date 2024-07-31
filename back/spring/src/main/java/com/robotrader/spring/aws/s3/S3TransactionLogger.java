package com.robotrader.spring.aws.s3;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.robotrader.spring.exception.aws.LogParsingException;
import com.robotrader.spring.exception.aws.TransactionRetrievalException;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
@ConditionalOnProperty(name = "s3.transaction_logging.enabled", havingValue = "true")
public class S3TransactionLogger {
    private final Dotenv dotenv;
    private final S3Logger s3Logger;
    private final ObjectMapper objectMapper;

    @Autowired
    public S3TransactionLogger(Dotenv dotenv, S3Logger s3Logger) {
        this.dotenv = dotenv;
        this.s3Logger = s3Logger;
        this.objectMapper = new ObjectMapper();
    }

    public void logWalletTransaction(String username, BigDecimal transactionAmount, BigDecimal totalAmount, String transactionType) {
        String bucketName = dotenv.get("AWS_S3_TRANSACTION_BUCKET_NAME");
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String fileName = String.format("transactions/%s/%s-%s.json", username, transactionType, timestamp);

        ObjectNode logEntry = objectMapper.createObjectNode();
        logEntry.put("timestamp", timestamp);
        logEntry.put("user", username);
        logEntry.put("transactionAmount", transactionAmount);
        logEntry.put("totalAmount", totalAmount);
        logEntry.put("type", transactionType);
        s3Logger.s3PutObject(bucketName, fileName, logEntry.toString());
    }

    public void logPortfolioTransaction(String username, PortfolioTypeEnum portfolioType, BigDecimal transactionAmount,
                                        BigDecimal totalAmount, String transactionType) {
        String bucketName = dotenv.get("AWS_S3_TRANSACTION_BUCKET_NAME");
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String fileName = String.format("transactions/%s/%s/%s-%s.json", username, portfolioType, transactionType, timestamp);

        ObjectNode logEntry = objectMapper.createObjectNode();
        logEntry.put("timestamp", timestamp);
        logEntry.put("user", username);
        logEntry.put("portfolio", portfolioType.name());
        logEntry.put("transactionAmount", transactionAmount);
        logEntry.put("totalAmount", totalAmount);
        logEntry.put("type", transactionType);
        s3Logger.s3PutObject(bucketName, fileName, logEntry.toString());
    }

    public List<ObjectNode> getWalletTransactions(String username, int page, int size) {
        String prefix = String.format("transactions/%s/", username);
        return getTransactions(prefix, page, size);
    }

    public List<ObjectNode> getPortfolioTransactions(String username, PortfolioTypeEnum portfolioType, int page, int size) {
        String prefix = String.format("transactions/%s/%s/", username, portfolioType);
        return getTransactions(prefix, page, size);
    }

    private List<ObjectNode> getTransactions(String prefix, int page, int size) {
        String bucketName = dotenv.get("AWS_S3_TRANSACTION_BUCKET_NAME");
        List<String> logs;
        try {
            logs = s3Logger.listAndRetrievePaginatedObjects(bucketName, prefix, page, size);
        } catch (Exception e) {
            throw new TransactionRetrievalException("Failed to retrieve transactions");
        }

        List<ObjectNode> parsedLogs = new ArrayList<>();

        for (String rawLog : logs) {
            try {
                ObjectNode logNode = (ObjectNode) objectMapper.readTree(rawLog);
                parsedLogs.add(logNode);
            } catch (Exception e) {
                throw new LogParsingException("Failed to parse log");
            }
        }
        return parsedLogs;
    }
}
