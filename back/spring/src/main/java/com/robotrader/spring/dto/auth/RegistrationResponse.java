package com.robotrader.spring.dto.auth;

import com.robotrader.spring.model.enums.RoleEnum;
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
    private RoleEnum role;
    private LocalDateTime timestamp;

    public RegistrationResponse(String jwtToken, String username, RoleEnum role) {
        this.jwtToken = jwtToken;
        this.username = username;
        this.role = role;
        this.timestamp = LocalDateTime.now();
    }
}
