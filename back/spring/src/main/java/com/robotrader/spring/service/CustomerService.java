package com.robotrader.spring.service;

import com.robotrader.spring.dto.auth.RegistrationRequest;
import com.robotrader.spring.model.Address;
import com.robotrader.spring.model.Customer;
import com.robotrader.spring.repository.CustomerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final AddressService addressService;
    private final FinancialProfileService financialProfileService;
    private final InvestorProfileService investorProfileService;
    private final WalletService walletService;
    private final PortfolioService portfolioService;

    @Autowired
    public CustomerService(CustomerRepository customerRepository, AddressService addressService, FinancialProfileService
            financialProfileService, InvestorProfileService investorProfileService, WalletService walletService,
                           PortfolioService portfolioService) {
        this.customerRepository = customerRepository;
        this.addressService = addressService;
        this.financialProfileService = financialProfileService;
        this.investorProfileService = investorProfileService;
        this.walletService = walletService;
        this.portfolioService = portfolioService;
    }

    public void save(Customer customer) {
        customerRepository.save(customer);
    }

    @Transactional
    public Customer createCustomerUser(RegistrationRequest registerRequest) {
        Customer customer = new Customer();

        customer.setFirstName(registerRequest.getFirstName());
        customer.setLastName(registerRequest.getLastName());
        customer.setNationality(registerRequest.getNationality());
        customer.setMobileNumber(registerRequest.getMobileNumber());

        customer.setFinancialProfile(financialProfileService.initBaseFinancialProfile());
        customer.setInvestorProfile(investorProfileService.initBaseInvestorProfile());
        customer.setWallet(walletService.initBaseWallet());
        customer.setPortfolios(portfolioService.initBasePortfolios());

        // todo: set address from registerRequest
        customer.setAddress(new Address("street", "city", "zip", "country", "state"));
        save(customer);

        return customer;
    }
}
