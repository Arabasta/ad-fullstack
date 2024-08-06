package com.robotrader.spring.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UpdateUserDTO {

      @NotBlank
      @Size(min = 3, max = 20)
      private String username;

      private boolean resetEmail;

      private boolean delete;
}

