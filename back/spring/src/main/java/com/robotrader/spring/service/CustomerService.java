package com.robotrader.spring.service;

import com.robotrader.spring.dto.customer.CustomerDTO;
import com.robotrader.spring.dto.customer.CustomerDetailsDTO;
import com.robotrader.spring.dto.customer.MobileNumberDTO;
import com.robotrader.spring.dto.customer.UpdateCustomerDTO;
import com.robotrader.spring.exception.notFound.CustomerNotFoundException;
import com.robotrader.spring.model.Customer;
import com.robotrader.spring.repository.CustomerRepository;
import com.robotrader.spring.service.interfaces.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class CustomerService implements ICustomerService {

    private final CustomerRepository customerRepository;
    private final IAddressService addressService;
    private final IFinancialProfileService financialProfileService;
    private final IInvestorProfileService investorProfileService;
    private final IWalletService walletService;
    private final IPortfolioService portfolioService;
    private final IUserService userService;

    @Autowired
    public CustomerService(CustomerRepository customerRepository, IAddressService addressService, IFinancialProfileService
            financialProfileService, IInvestorProfileService investorProfileService, IWalletService walletService,
                           IPortfolioService portfolioService, @Lazy IUserService userService) {
        this.customerRepository = customerRepository;
        this.addressService = addressService;
        this.financialProfileService = financialProfileService;
        this.investorProfileService = investorProfileService;
        this.walletService = walletService;
        this.portfolioService = portfolioService;
        this.userService = userService;
    }

    @Override
    @Transactional
    public void save(Customer customer) {
        customerRepository.save(customer);
    }

    @Override
    @Transactional
    public Customer create(CustomerDTO customerDTO) {
        Customer customer = new Customer();
        customer.setFirstName(customerDTO.getFirstName());
        customer.setLastName(customerDTO.getLastName());
        customer.setNationality(customerDTO.getNationality());
        customer.setMobileNumber(customerDTO.getMobileNumber());

        customer.setAddress(addressService.create(customerDTO.getAddress()));
        customer.setFinancialProfile(financialProfileService.create(customerDTO.getFinancialProfile()));
        customer.setInvestorProfile(investorProfileService.initBaseInvestorProfile());
        customer.setWallet(walletService.initBaseWallet());
        customer.setPortfolios(portfolioService.initBasePortfolios());

        save(customer);
        return customer;
    }

    @Override
    public Customer getCustomerByUsername(String username) {
        Customer customer = userService.getUserByUsername(username).getCustomer();
        if (customer == null) {
            throw new CustomerNotFoundException("Customer not found");
        }
        return customer;
    }

    @Override
    public CustomerDetailsDTO getCustomerDetails(String username) {
        Customer customer = getCustomerByUsername(username);
        return new CustomerDetailsDTO(customer.getFirstName(),
                customer.getLastName(),
                customer.getNationality(),
                customer.getMobileNumber());
    }

    @Override
    @Transactional
    public MobileNumberDTO updateMobileNumber(String username, MobileNumberDTO mobileNumberDTO) {
        Customer customer = getCustomerByUsername(username);
        // todo: check if mobile number is already in use
        // todo: send sms to verify mobile number
        customer.setMobileNumber(mobileNumberDTO.getMobileNumber());
        save(customer);
        return mobileNumberDTO;
    }

    // for admin
    @Override
    @Transactional
    public UpdateCustomerDTO updateCustomer(String username, UpdateCustomerDTO updateCustomerDTO) {
        Customer customer = getCustomerByUsername(username);
        customer.setFirstName(updateCustomerDTO.getFirstName());
        customer.setLastName(updateCustomerDTO.getLastName());
        customer.setNationality(updateCustomerDTO.getNationality());
        save(customer);
        return updateCustomerDTO;
    }
}
