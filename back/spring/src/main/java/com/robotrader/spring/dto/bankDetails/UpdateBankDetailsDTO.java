package com.robotrader.spring.dto.bankDetails;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateBankDetailsDTO {

    @NotBlank(message = "Bank name cannot be blank")
    @Size(max = 20, message = "Bank name must not exceed 20 characters")
    private String bankName;

    @NotBlank(message = "Account number cannot be blank")
    @Size(min = 7, max = 11, message = "Account number must be between 7 and 11 digits")
    @Pattern(regexp = "\\d{7,11}", message = "Account number must contain 7 to 11 digits and only digits")
    private String accountNumber;

    @NotBlank(message = "Account holder name cannot be blank")
    @Size(max = 50, message = "Account holder name must not exceed 50 characters")
    private String accountHolderName;
}
