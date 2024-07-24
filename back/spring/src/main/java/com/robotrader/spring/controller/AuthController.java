package com.robotrader.spring.controller;

import com.robotrader.spring.dto.auth.AuthenticationRequest;
import com.robotrader.spring.dto.auth.AuthenticationResponse;
import com.robotrader.spring.model.User;
import com.robotrader.spring.security.JwtUtil;
import com.robotrader.spring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthController(UserService userService, PasswordEncoder passwordEncoder,
                          AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.save(user);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public AuthenticationResponse loginUser(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
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
