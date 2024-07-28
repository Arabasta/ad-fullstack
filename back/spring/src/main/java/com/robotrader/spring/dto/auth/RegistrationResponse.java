package com.robotrader.spring.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
public class RegistrationResponse {
    private String message;
    private String username;
    private String jwtToken;
    private LocalDateTime timestamp;

    public RegistrationResponse(String jwtToken, String username) {
        this.jwtToken = jwtToken;
        this.username = username;
        this.timestamp = LocalDateTime.now();
    }
}
