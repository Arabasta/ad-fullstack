package com.robotrader.spring.controller.customer;

import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.investorProfile.InvestorProfileDTO;
import com.robotrader.spring.dto.investorProfile.InvestorProfileUpdateDTO;
import com.robotrader.spring.service.interfaces.IInvestorProfileService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customer/investment-profile")
public class InvestorProfileControllerV1 {

    private final IInvestorProfileService investorProfileService;

    @Autowired
    public InvestorProfileControllerV1(IInvestorProfileService investorProfileService) {
        this.investorProfileService = investorProfileService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<InvestorProfileDTO>> getInvestorProfile(Authentication authentication) {
        String username = authentication.getName();
        InvestorProfileDTO investorProfileDTO = investorProfileService.getInvestorProfileDTOByUsername(username);
        return ResponseEntity.ok(new ApiResponse<>("success", "Investor profile retrieved successfully", investorProfileDTO));
    }

    @PostMapping("/update")
    public ResponseEntity<ApiResponse<InvestorProfileDTO>> updateInvestorProfile(Authentication authentication,
                                                                                 @Valid @RequestBody InvestorProfileUpdateDTO investorProfileDTO) {
        String username = authentication.getName();
        InvestorProfileDTO updatedProfileDTO = investorProfileService.update(username, investorProfileDTO);
        return ResponseEntity.ok(new ApiResponse<>("success", "Investor profile updated successfully", updatedProfileDTO));
    }
}
