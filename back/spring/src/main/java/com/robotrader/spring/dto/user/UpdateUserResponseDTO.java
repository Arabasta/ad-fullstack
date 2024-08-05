package com.robotrader.spring.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UpdateUserResponseDTO {

    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    private boolean isResetEmail;

    private boolean isDeleted;
}


