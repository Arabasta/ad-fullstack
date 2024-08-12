package com.robotrader.spring.dto.auth;

import com.robotrader.spring.model.enums.RoleEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthenticationResponse {
    private final String jwtToken;
    private final String username;
    private final RoleEnum role;
}