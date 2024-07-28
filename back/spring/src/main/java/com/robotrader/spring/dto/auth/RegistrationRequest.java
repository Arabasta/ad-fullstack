package com.robotrader.spring.dto.auth;

import com.robotrader.spring.dto.customer.CustomerDTO;
import com.robotrader.spring.dto.user.UserCredentialsDTO;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationRequest {
    @NotNull
    private UserCredentialsDTO userDetails;

    @NotNull
    private CustomerDTO customerDetails;
}
