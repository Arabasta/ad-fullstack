package com.robotrader.spring.controller.developer;

import com.robotrader.spring.dto.auth.RegistrationRequest;
import com.robotrader.spring.dto.auth.RegistrationResponse;
import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.service.interfaces.IAuthenticationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for creating an admin user
 * This controller is only for development and submission purposes
 * It is not part of the final product, only for markers to test the application
 *
 */
@RestController
@RequestMapping("/api/v1/dev/admin")
public class DevCreateAdminControllerV1 {

    private final IAuthenticationService authenticationService;

    @Autowired
    public DevCreateAdminControllerV1(IAuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<RegistrationResponse>> registerCustomerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {
        RegistrationResponse response = authenticationService.registerUser(registrationRequest, false);
        ApiResponse<RegistrationResponse> apiResponse = new ApiResponse<>("success", "Registration successful", response);
        return ResponseEntity.ok(apiResponse);
    }
}