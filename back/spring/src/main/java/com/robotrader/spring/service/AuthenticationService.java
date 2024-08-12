package com.robotrader.spring.service;

import com.robotrader.spring.dto.auth.AuthenticationRequest;
import com.robotrader.spring.dto.auth.AuthenticationResponse;
import com.robotrader.spring.dto.auth.RegistrationRequest;
import com.robotrader.spring.dto.auth.RegistrationResponse;
import com.robotrader.spring.model.enums.RoleEnum;
import com.robotrader.spring.security.JwtUtil;
import com.robotrader.spring.service.interfaces.IAuthenticationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService implements IAuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    @Autowired
    public AuthenticationService(AuthenticationManager authenticationManager,
                                 JwtUtil jwtUtil, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @Override
    @Transactional
    public RegistrationResponse registerUser(RegistrationRequest registrationRequest, boolean isCustomer) {
        final UserDetails userDetails = userService.create(registrationRequest, !isCustomer);
        final String jwtToken = jwtUtil.generateToken(userDetails);
        RoleEnum role = isCustomer ? RoleEnum.ROLE_CUSTOMER : RoleEnum.ROLE_ADMIN;
        return new RegistrationResponse(jwtToken, userDetails.getUsername(), role);
    }

    @Override
    public AuthenticationResponse authenticateUser(AuthenticationRequest authenticationRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword())
        );

        final UserDetails userDetails = userService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwtToken = jwtUtil.generateToken(userDetails);
        boolean isCustomer = userDetails.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals(RoleEnum.ROLE_CUSTOMER.name()));
        RoleEnum role = isCustomer ? RoleEnum.ROLE_CUSTOMER : RoleEnum.ROLE_ADMIN;
        return new AuthenticationResponse(jwtToken, userDetails.getUsername(), role);
    }

}
