package com.robotrader.spring.controller.customer;

import com.robotrader.spring.dto.bankDetails.BankDetailsDTO;
import com.robotrader.spring.dto.bankDetails.UpdateBankDetailsDTO;
import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.service.BankDetailsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customer/bank-details")
public class BankDetailsControllerV1 {

    private final BankDetailsService bankDetailsService;

    @Autowired
    public BankDetailsControllerV1(BankDetailsService bankDetailsService) {
        this.bankDetailsService = bankDetailsService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<BankDetailsDTO>> getBankDetails(Authentication authentication) {
        String username = authentication.getName();
        BankDetailsDTO bankDetailsDTO = bankDetailsService.getBankDetailsDTO(username);
        return ResponseEntity.ok(new ApiResponse<>("success", "Bank details retrieved successfully", bankDetailsDTO));
    }

    @PostMapping("/update")
    public ResponseEntity<ApiResponse<BankDetailsDTO>> updateBankDetails(Authentication authentication,
                                                                       @Valid @RequestBody UpdateBankDetailsDTO updateBankDetailsDTO) {
        String username = authentication.getName();
        BankDetailsDTO updatedBankDetailsDTO = bankDetailsService.updateBankDetails(username, updateBankDetailsDTO);
        return ResponseEntity.ok(new ApiResponse<>("success", "Bank details updated successfully", updatedBankDetailsDTO));
    }
}
