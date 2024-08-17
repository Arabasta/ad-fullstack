package com.robotrader.spring.dto.customer;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCustomerDTO {

    @NotBlank
    @Size(min = 1, max = 50, message = "Username must be between 1 to 50 characters")
    private String username;

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
