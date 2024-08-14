package com.robotrader.spring.controller.developer;

import com.robotrader.spring.aws.s3.S3Wipe;
import com.robotrader.spring.dto.general.ApiErrorResponse;
import com.robotrader.spring.dto.general.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for wiping the S3 transaction bucket
 * This controller is only for development purposes
 * It is not part of the final product, only for development team to wipe the bucket
 *
 */
@RestController
@RequestMapping("/api/v1/devAws")
@ConditionalOnProperty(name = "s3.transaction_logging.enabled", havingValue = "true")
public class DevAwsControllerV1 {

    private final S3Wipe s3Wipe;

    @Value("${aws.s3.transaction-bucket-name}")
    private String transactionBucketName;

    @Autowired
    public DevAwsControllerV1(@Autowired(required = false) S3Wipe s3Wipe) {
        this.s3Wipe = s3Wipe;
    }

    @DeleteMapping("/wipe-tx")
    public ResponseEntity<?> wipeS3TransactionBucket() {
        if (transactionBucketName == null) {
            ApiErrorResponse response = new ApiErrorResponse("error", "Bucket name is not configured.",
                    "AWS_S3_TRANSACTION_BUCKET_NAME environment variable is missing.");
            return ResponseEntity.status(400).body(response);
        }

        try {
            s3Wipe.wipeBucket(transactionBucketName);
            ApiResponse<String> apiResponse = new ApiResponse<>("success", "S3 bucket wiped successfully",
                    null);
            return ResponseEntity.ok(apiResponse);
        } catch (Exception e) {
            ApiErrorResponse response = new ApiErrorResponse("error", "Failed to wipe S3 bucket.", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
