package com.robotrader.spring.controller.developer;

import com.robotrader.spring.aws.s3.S3Wipe;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/devAws")
public class DevAwsControllerV1 {

    private final S3Wipe s3Wipe;
    private final Dotenv dotenv;

    @Autowired
    public DevAwsControllerV1(S3Wipe s3Logger, Dotenv dotenv) {
        this.s3Wipe = s3Logger;
        this.dotenv = dotenv;
    }

    @DeleteMapping("/wipe-tx")
    public ResponseEntity<String> wipeS3TransactionBucket() {
        String bucketName = dotenv.get("AWS_S3_TRANSACTION_BUCKET_NAME");
        s3Wipe.wipeBucket(bucketName);
        return ResponseEntity.ok("S3 bucket wiped successfully");
    }
}
