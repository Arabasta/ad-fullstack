package com.robotrader.spring.controller.Authentication;

import com.robotrader.spring.dto.auth.AuthenticationRequest;
import com.robotrader.spring.dto.auth.AuthenticationResponse;
import com.robotrader.spring.dto.auth.RegistrationRequest;
import com.robotrader.spring.dto.auth.RegistrationResponse;
import com.robotrader.spring.service.AuthenticationService;
import com.robotrader.spring.service.UserService;
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
    private final UserService userService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService, UserService userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> registerCustomerUser(@RequestBody RegistrationRequest registrationRequest) {
        RegistrationResponse response = userService.create(registrationRequest, true);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginUser(@RequestBody AuthenticationRequest authenticationRequest) {
        AuthenticationResponse response = authenticationService.authenticateUser(authenticationRequest);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
