package com.robotrader.spring.dto.auth;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationRequest {
    @NotNull
    private UserDetailsDTO userDetails;

    @NotNull
    private CustomerCreateDTO customerDetails;
}
