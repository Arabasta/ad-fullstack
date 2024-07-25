package com.robotrader.spring.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @Size(min = 6)
    private String password;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 7, max = 15, message = "Please input a valid mobile number")
    private String mobileNumber;

    @NotBlank
    @Size(min = 1, max = 50, message = "First Name cannot be more than 50 characters")
    private String firstName;

    @NotBlank
    @Size(min = 1, max = 50, message = "Last Name cannot be more than 50 characters")
    private String lastName;

    @NotBlank
    @Size(min = 1, max = 50, message = "Nationality cannot be more than 50 characters")
    private String nationality;

}
