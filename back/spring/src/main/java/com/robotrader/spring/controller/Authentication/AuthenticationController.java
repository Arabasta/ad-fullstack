package com.robotrader.spring.controller.Authentication;

import com.robotrader.spring.dto.auth.AuthenticationRequest;
import com.robotrader.spring.dto.auth.AuthenticationResponse;
import com.robotrader.spring.dto.auth.RegistrationRequest;
import com.robotrader.spring.dto.auth.RegistrationResponse;
import com.robotrader.spring.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService userService) {
        this.authenticationService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> registerCustomerUser(@RequestBody RegistrationRequest registerRequest) {
        RegistrationResponse response = authenticationService.registerCustomer(registerRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginUser(@RequestBody AuthenticationRequest authenticationRequest) {
        AuthenticationResponse response = authenticationService.authenticateUser(authenticationRequest);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
