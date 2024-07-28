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
public class MobileNumberDTO {
    @NotBlank
    @Size(min = 7, max = 15, message = "Please input a valid mobile number")
    private String mobileNumber;
}
