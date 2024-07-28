package com.robotrader.spring.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePasswordDTO {
    @NotBlank
    @Size(min = 6, message = "Password must at least 6 characters")
    private String password;
}
