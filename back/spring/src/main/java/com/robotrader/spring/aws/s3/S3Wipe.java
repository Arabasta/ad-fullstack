package com.robotrader.spring.aws.s3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Response;

@Component
@ConditionalOnProperty(name = "s3.transaction_logging.enabled", havingValue = "true")
public class S3Wipe {
    private final S3Client s3Client;

    @Autowired
    public S3Wipe(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public void wipeBucket(String bucketName) {
        ListObjectsV2Request listObjectsV2Request = ListObjectsV2Request.builder()
                .bucket(bucketName)
                .build();
        ListObjectsV2Response listObjectsV2Response;

        do {
            listObjectsV2Response = s3Client.listObjectsV2(listObjectsV2Request);

            listObjectsV2Response.contents().forEach(s3Object -> {
                DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                        .bucket(bucketName)
                        .key(s3Object.key())
                        .build();
                s3Client.deleteObject(deleteObjectRequest);
            });

            listObjectsV2Request = listObjectsV2Request.toBuilder()
                    .continuationToken(listObjectsV2Response.nextContinuationToken())
                    .build();

        } while (listObjectsV2Response.isTruncated());
    }
}
