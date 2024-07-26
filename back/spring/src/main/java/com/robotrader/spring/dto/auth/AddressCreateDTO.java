package com.robotrader.spring.dto.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressCreateDTO {
    @NotBlank
    @Size(min = 1, max = 50, message = "Block, street, building, etc. cannot be more than 50 characters")
    private String street;

    @NotBlank
    @Size(min = 1, max = 50, message = "City cannot be more than 50 characters")
    private String city;

    @NotBlank
    @Size(min = 1, max = 50, message = "Postal code cannot be more than 50 characters")
    private String postalCode;

    @NotBlank
    @Size(min = 1, max = 50, message = "Country cannot be more than 50 characters")
    private String country;

    @NotBlank
    @Size(min = 1, max = 10, message = "Unit number cannot be more than 10 characters")
    private String unitNo;
}
