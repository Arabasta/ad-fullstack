package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.customer.CustomerDTO;
import com.robotrader.spring.dto.customer.CustomerDetailsDTO;
import com.robotrader.spring.dto.customer.MobileNumberDTO;
import com.robotrader.spring.dto.customer.UpdateCustomerDTO;
import com.robotrader.spring.model.Customer;

import java.util.List;

public interface ICustomerService {
    void save(Customer customer);
    Customer create(CustomerDTO customerDTO);
    List<CustomerDetailsDTO> getCustomers();
    Customer getCustomerByUsername(String username);
    CustomerDetailsDTO getCustomerDetails(String username);
    MobileNumberDTO updateMobileNumber(String username, MobileNumberDTO mobileNumberDTO);
    UpdateCustomerDTO updateCustomer(UpdateCustomerDTO updateCustomerDTO);
}
