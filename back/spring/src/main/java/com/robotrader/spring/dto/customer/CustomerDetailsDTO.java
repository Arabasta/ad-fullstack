package com.robotrader.spring.dto.customer;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CustomerDetailsDTO {

    @NotBlank
    @Size(min = 1, max = 50, message = "First Name cannot be more than 50 characters")
    private String firstName;

    @NotBlank
    @Size(min = 1, max = 50, message = "Last Name cannot be more than 50 characters")
    private String lastName;

    @NotBlank
    @Size(min = 1, max = 50, message = "Nationality cannot be more than 50 characters")
    private String nationality;

    @NotBlank
    @Size(min = 7, max = 15, message = "Please input a valid mobile number")
    private String mobileNumber;
}
