package com.robotrader.spring.controller.customer;

import com.robotrader.spring.dto.financialProfile.FinancialProfileDTO;
import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.service.interfaces.IFinancialProfileService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customer/financial-profile")
public class FinancialProfileControllerV1 {

    private final IFinancialProfileService financialProfileService;

    @Autowired
    public FinancialProfileControllerV1(IFinancialProfileService financialProfileService) {
        this.financialProfileService = financialProfileService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<FinancialProfileDTO>> getFinancialProfile(Authentication authentication) {
        String username = authentication.getName();
        FinancialProfileDTO financialProfileDTO = financialProfileService.getFinancialProfileDTOByUsername(username);
        return ResponseEntity.ok(new ApiResponse<>("success", "Financial profile retrieved successfully", financialProfileDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse<FinancialProfileDTO>> updateFinancialProfile(Authentication authentication,
                                                                                   @Valid @RequestBody FinancialProfileDTO financialProfileDTO) {
        String username = authentication.getName();
        FinancialProfileDTO updatedProfileDTO = financialProfileService.update(username, financialProfileDTO);
        return ResponseEntity.ok(new ApiResponse<>("success", "Financial profile updated successfully", updatedProfileDTO));
    }

}
