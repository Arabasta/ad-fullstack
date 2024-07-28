package com.robotrader.spring.controller.customer;

import com.robotrader.spring.dto.customer.CustomerDetailsDTO;
import com.robotrader.spring.dto.customer.MobileNumberDTO;
import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.service.interfaces.ICustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customer")
public class CustomerControllerV1 {

    private final ICustomerService customerService;

    @Autowired
    public CustomerControllerV1(ICustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/details")
    public ResponseEntity<ApiResponse<CustomerDetailsDTO>> getCustomerDetails(Authentication authentication) {
        String username = authentication.getName();
        CustomerDetailsDTO customerDetailsDTO = customerService.getCustomerDetails(username);
        return ResponseEntity.ok(new ApiResponse<>("success", "Customer details retrieved successfully", customerDetailsDTO));
    }

    @PostMapping("/update-mobile-number")
    public ResponseEntity<ApiResponse<MobileNumberDTO>> updateMobileNumber(Authentication authentication,
                                                                           @Valid @RequestBody MobileNumberDTO mobileNumberDTO) {
        String username = authentication.getName();
        MobileNumberDTO updatedMobileNumberDTO = customerService.updateMobileNumber(username, mobileNumberDTO);
        return ResponseEntity.ok(new ApiResponse<>("success", "Mobile number updated successfully", updatedMobileNumberDTO));
    }
}
