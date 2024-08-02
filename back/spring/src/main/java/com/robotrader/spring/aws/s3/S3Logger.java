package com.robotrader.spring.aws.s3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Component
@ConditionalOnProperty(name = "s3.transaction_logging.enabled", havingValue = "true")
public class S3Logger {
    private final S3Client s3Client;

    @Autowired
    public S3Logger(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public void s3PutObject(String bucketName, String key, String value) {
        s3Client.putObject(PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .build(),
                RequestBody.fromString(value));
    }

    public List<String> listAndRetrievePaginatedObjects(String bucketName, String prefix, int page, int size) {
        List<S3Object> objects = s3Client.listObjectsV2(ListObjectsV2Request.builder()
                        .bucket(bucketName)
                        .prefix(prefix)
                        .build())
                .contents()
                .stream()
                .sorted(Comparator.comparing(S3Object::key).reversed()) // Sort by key (timestamp) in descending order
                .skip(page * size) // Skip to the current page
                .limit(size) // Limit the results to the page size
                .collect(Collectors.toList());

        return objects.stream()
                .map(S3Object::key)
                .map(key -> s3Client.getObjectAsBytes(GetObjectRequest.builder().bucket(bucketName).key(key).build()).asUtf8String())
                .collect(Collectors.toList());
    }

    private String getContinuationToken(String bucketName, String prefix, int page, int size) {
        String continuationToken = null;
        int skipCount = page * size;

        ListObjectsV2Request.Builder requestBuilder = ListObjectsV2Request.builder()
                .bucket(bucketName)
                .prefix(prefix)
                .maxKeys(skipCount + 1);  // skip to the starting point of page

        while (skipCount > 0) {
            ListObjectsV2Response response = s3Client.listObjectsV2(requestBuilder.continuationToken(continuationToken).build());
            List<S3Object> objects = response.contents();
            if (objects.size() < skipCount) {
                skipCount -= objects.size();
                continuationToken = response.nextContinuationToken();
            } else {
                continuationToken = response.nextContinuationToken();
                break;
            }
        }
        return continuationToken;
    }

    // unused for now
    // anyone using this method should be aware that it will return the last n objects in the bucket
    public List<String> listAndRetrieveNumObjects(String bucketName, String prefix, int num) {
        List<String> logs = new ArrayList<>();
        ListObjectsV2Request listObjectsReqManual = ListObjectsV2Request.builder()
                .bucket(bucketName)
                .prefix(prefix)
                .maxKeys(num)
                .build();

        s3Client.listObjectsV2(listObjectsReqManual).contents().stream()
                .sorted(Comparator.comparing(S3Object::key).reversed())
                .limit(num)
                .forEach(s3Object -> {
                    String log = s3Client.getObjectAsBytes(GetObjectRequest.builder()
                            .bucket(bucketName)
                            .key(s3Object.key())
                            .build()).asUtf8String();
                    logs.add(log);
                });

        return logs;
    }
}
