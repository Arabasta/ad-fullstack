package com.robotrader.spring.controller.authentication;

import com.robotrader.spring.dto.auth.AuthenticationRequest;
import com.robotrader.spring.dto.auth.AuthenticationResponse;
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

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationControllerV1 {

    private final IAuthenticationService authenticationService;

    @Autowired
    public AuthenticationControllerV1(IAuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<RegistrationResponse>> registerCustomerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {
        RegistrationResponse response = authenticationService.registerUser(registrationRequest, true);
        ApiResponse<RegistrationResponse> apiResponse = new ApiResponse<>("success", "Registration successful", response);
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthenticationResponse>> loginUser(@Valid @RequestBody AuthenticationRequest authenticationRequest) {
        AuthenticationResponse response = authenticationService.authenticateUser(authenticationRequest);
        ApiResponse<AuthenticationResponse> apiResponse = new ApiResponse<>("success", "Login successful", response);
        return ResponseEntity.ok(apiResponse);
    }
}
