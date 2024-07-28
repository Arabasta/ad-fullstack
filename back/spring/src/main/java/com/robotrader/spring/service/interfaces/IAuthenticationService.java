package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.auth.AuthenticationRequest;
import com.robotrader.spring.dto.auth.AuthenticationResponse;
import com.robotrader.spring.dto.auth.RegistrationRequest;
import com.robotrader.spring.dto.auth.RegistrationResponse;

public interface IAuthenticationService {
    RegistrationResponse registerUser(RegistrationRequest registrationRequest, boolean isCustomer);
    AuthenticationResponse authenticateUser(AuthenticationRequest authenticationRequest);
}
