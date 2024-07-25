package com.robotrader.spring.service;

import com.robotrader.spring.dto.auth.AuthenticationRequest;
import com.robotrader.spring.dto.auth.AuthenticationResponse;
import com.robotrader.spring.dto.auth.RegistrationRequest;
import com.robotrader.spring.dto.auth.RegistrationResponse;
import com.robotrader.spring.model.User;
import com.robotrader.spring.model.enums.RoleEnum;
import com.robotrader.spring.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    @Autowired
    public AuthenticationService(PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,
                                 JwtUtil jwtUtil, UserService userService) {
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    public RegistrationResponse registerCustomer(RegistrationRequest registerRequest) {
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEmail(registerRequest.getEmail());
        user.setRole(RoleEnum.ROLE_CUSTOMER);
        userService.save(user);

        return new RegistrationResponse("User registered successfully", user.getId());
    }

    public AuthenticationResponse authenticateUser(AuthenticationRequest authenticationRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword())
        );

        final UserDetails userDetails = userService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwtToken = jwtUtil.generateToken(userDetails);
        return new AuthenticationResponse(jwtToken, userDetails.getUsername());
    }
}
