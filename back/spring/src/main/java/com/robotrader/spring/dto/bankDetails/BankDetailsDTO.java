package com.robotrader.spring.dto.bankDetails;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BankDetailsDTO {
    private Long id;
    private String bankName;
    private String accountNumber;
    private String accountHolderName;
}
