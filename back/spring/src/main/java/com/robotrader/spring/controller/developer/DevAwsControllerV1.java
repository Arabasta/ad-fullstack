package com.robotrader.spring.controller.developer;

import com.robotrader.spring.aws.s3.S3Wipe;
import com.robotrader.spring.dto.general.ApiErrorResponse;
import com.robotrader.spring.dto.general.ApiResponse;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/devAws")
@ConditionalOnProperty(name = "s3.transaction_logging.enabled", havingValue = "true")
public class DevAwsControllerV1 {

    private final S3Wipe s3Wipe;
    private final Dotenv dotenv;

    @Autowired
    public DevAwsControllerV1(S3Wipe s3Wipe, Dotenv dotenv) {
        this.s3Wipe = s3Wipe;
        this.dotenv = dotenv;
    }

    @DeleteMapping("/wipe-tx")
    public ResponseEntity<?> wipeS3TransactionBucket() {
        String bucketName = dotenv.get("AWS_S3_TRANSACTION_BUCKET_NAME");
        if (bucketName == null) {
            ApiErrorResponse response = new ApiErrorResponse("error", "Bucket name is not configured.",
                    "AWS_S3_TRANSACTION_BUCKET_NAME environment variable is missing.");
            return ResponseEntity.status(400).body(response);
        }

        try {
            s3Wipe.wipeBucket(bucketName);
            ApiResponse<String> apiResponse = new ApiResponse<>("success", "S3 bucket wiped successfully",
                    null);
            return ResponseEntity.ok(apiResponse);
        } catch (Exception e) {
            ApiErrorResponse response = new ApiErrorResponse("error", "Failed to wipe S3 bucket.", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
