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

    public List<String> listAndRetrieveLatestObjects(String bucketName, String prefix, int count) {
        List<String> logs = new ArrayList<>();
        ListObjectsV2Request listObjectsReqManual = ListObjectsV2Request.builder()
                .bucket(bucketName)
                .prefix(prefix)
                .maxKeys(count)
                .build();

        ListObjectsV2Response listObjResponse = s3Client.listObjectsV2(listObjectsReqManual);

        // Retrieve latest 'count' objects
        listObjResponse.contents().stream()
                .sorted(Comparator.comparing(S3Object::key).reversed())
                .limit(count)
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
