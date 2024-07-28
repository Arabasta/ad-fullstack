package com.robotrader.spring.controller.customer;

import com.robotrader.spring.dto.address.AddressDTO;
import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.service.interfaces.IAddressService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customer/address")
public class AddressControllerV1 {

    private final IAddressService addressService;

    @Autowired
    public AddressControllerV1(IAddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<AddressDTO>> getAddress(Authentication authentication) {
        String username = authentication.getName();
        AddressDTO addressDTO = addressService.getAddressDTOByUsername(username);
        return ResponseEntity.ok(new ApiResponse<>("success", "Address retrieved successfully", addressDTO));
    }

    @PostMapping("/update")
    public ResponseEntity<ApiResponse<AddressDTO>> updateAddress(Authentication authentication,
                                                                 @Valid @RequestBody AddressDTO addressDTO) {
        String username = authentication.getName();
        AddressDTO updatedAddressDTO = addressService.update(username, addressDTO);
        return ResponseEntity.ok(new ApiResponse<>("success", "Address updated successfully", updatedAddressDTO));
    }
}
