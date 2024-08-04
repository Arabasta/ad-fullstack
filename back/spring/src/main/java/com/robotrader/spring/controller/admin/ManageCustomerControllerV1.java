package com.robotrader.spring.controller.admin;

import com.robotrader.spring.dto.customer.CustomerDetailsDTO;
import com.robotrader.spring.dto.customer.UpdateCustomerDTO;
import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.service.interfaces.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/customer")
public class ManageCustomerControllerV1 {

    private final ICustomerService customerService;

    @Autowired
    public ManageCustomerControllerV1(ICustomerService customerService) {
        this.customerService = customerService;
    }

    // NOTE FOR FRONTEND, DO NOT IMPLEMENT UNLESS VERY FREE

    // send email update
    // ban user etc (in another file)
    // todo: add pagination if free
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<CustomerDetailsDTO>>> getCustomers(Authentication authentication) {
        return ResponseEntity.ok(new ApiResponse<>("success", "Customers retrieved successfully",
                customerService.getCustomers()));
    }

    @PostMapping("/update")
    public ResponseEntity<ApiResponse<UpdateCustomerDTO>> updateCustomer(Authentication authentication,
                                                                          UpdateCustomerDTO updateCustomerDTO) {
        return ResponseEntity.ok(new ApiResponse<>("success", "Customer updated successfully",
                customerService.updateCustomer(updateCustomerDTO)));
    }



}
