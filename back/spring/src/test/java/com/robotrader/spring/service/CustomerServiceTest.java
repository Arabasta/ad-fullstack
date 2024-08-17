package com.robotrader.spring.service;

import com.robotrader.spring.dto.customer.CustomerDTO;
import com.robotrader.spring.dto.customer.CustomerDetailsDTO;
import com.robotrader.spring.dto.customer.MobileNumberDTO;
import com.robotrader.spring.dto.customer.UpdateCustomerDTO;
import com.robotrader.spring.exception.notFound.CustomerNotFoundException;
import com.robotrader.spring.model.Customer;
import com.robotrader.spring.model.User;
import com.robotrader.spring.repository.CustomerRepository;
import com.robotrader.spring.service.interfaces.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CustomerServiceTest {

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private IAddressService addressService;

    @Mock
    private IFinancialProfileService financialProfileService;

    @Mock
    private IInvestorProfileService investorProfileService;

    @Mock
    private IWalletService walletService;

    @Mock
    private IPortfolioService portfolioService;

    @Mock
    private IUserService userService;

    @InjectMocks
    private CustomerService customerService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateCustomer_Success() {
        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setFirstName("John");
        customerDTO.setLastName("Doe");
        customerDTO.setNationality("Singaporean");
        customerDTO.setMobileNumber("12345678");

        when(addressService.create(customerDTO.getAddress())).thenReturn(null);
        when(financialProfileService.create(customerDTO.getFinancialProfile())).thenReturn(null);
        when(investorProfileService.create(customerDTO.getInvestorProfile())).thenReturn(null);
        when(walletService.initBaseWallet()).thenReturn(null);
        when(portfolioService.initBasePortfolios()).thenReturn(null);

        Customer customer = customerService.create(customerDTO);

        assertNotNull(customer);
        assertEquals("John", customer.getFirstName());
        assertEquals("Doe", customer.getLastName());
        assertEquals("Singaporean", customer.getNationality());
        assertEquals("12345678", customer.getMobileNumber());

        verify(customerRepository).save(customer);
    }

    @Test
    void testGetCustomers_Success() {
        Customer customer1 = new Customer();
        customer1.setFirstName("John");
        customer1.setLastName("Doe");
        customer1.setNationality("Singaporean");
        customer1.setMobileNumber("12345678");

        Customer customer2 = new Customer();
        customer2.setFirstName("Jane");
        customer2.setLastName("Doe");
        customer2.setNationality("Singaporean");
        customer2.setMobileNumber("87654321");

        when(customerRepository.findAll()).thenReturn(Arrays.asList(customer1, customer2));

        List<CustomerDetailsDTO> customers = customerService.getCustomers();

        assertNotNull(customers);
        assertEquals(2, customers.size());
        assertEquals("John", customers.get(0).getFirstName());
        assertEquals("Jane", customers.get(1).getFirstName());
    }

    @Test
    void testGetCustomerByUsername_Success() {
        User user = new User();
        Customer customer = new Customer();
        user.setCustomer(customer);

        when(userService.getUserByUsername("user")).thenReturn(user);

        Customer result = customerService.getCustomerByUsername("user");

        assertNotNull(result);
        assertEquals(customer, result);
    }

    @Test
    void testGetCustomerByUsername_CustomerNotFound() {
        User user = new User();
        user.setCustomer(null);

        when(userService.getUserByUsername("user")).thenReturn(user);

        assertThrows(CustomerNotFoundException.class, () -> customerService.getCustomerByUsername("user"));
    }

    @Test
    void testGetCustomerDetails_Success() {
        Customer customer = new Customer();
        customer.setFirstName("John");
        customer.setLastName("Doe");
        customer.setNationality("Singaporean");
        customer.setMobileNumber("12345678");

        User user = new User();
        user.setCustomer(customer);

        when(userService.getUserByUsername("user")).thenReturn(user);

        CustomerDetailsDTO customerDetails = customerService.getCustomerDetails("user");

        assertNotNull(customerDetails);
        assertEquals("John", customerDetails.getFirstName());
        assertEquals("Doe", customerDetails.getLastName());
        assertEquals("Singaporean", customerDetails.getNationality());
        assertEquals("12345678", customerDetails.getMobileNumber());
    }

    @Test
    void testUpdateMobileNumber_Success() {
        Customer customer = new Customer();
        customer.setMobileNumber("12345678");

        User user = new User();
        user.setCustomer(customer);

        when(userService.getUserByUsername("user")).thenReturn(user);

        MobileNumberDTO mobileNumberDTO = new MobileNumberDTO();
        mobileNumberDTO.setMobileNumber("87654321");

        MobileNumberDTO result = customerService.updateMobileNumber("user", mobileNumberDTO);

        assertNotNull(result);
        assertEquals("87654321", result.getMobileNumber());
        verify(customerRepository).save(customer);
    }

    @Test
    void testUpdateCustomer_Success() {
        Customer customer = new Customer();
        customer.setFirstName("John");
        customer.setLastName("Doe");
        customer.setNationality("Singaporean");

        User user = new User();
        user.setCustomer(customer);

        when(userService.getUserByUsername("user")).thenReturn(user);

        UpdateCustomerDTO updateCustomerDTO = new UpdateCustomerDTO();
        updateCustomerDTO.setUsername("user");
        updateCustomerDTO.setFirstName("Jane");
        updateCustomerDTO.setLastName("Doe");
        updateCustomerDTO.setNationality("Malaysian");

        UpdateCustomerDTO result = customerService.updateCustomer(updateCustomerDTO);

        assertNotNull(result);
        assertEquals("Jane", customer.getFirstName());
        assertEquals("Doe", customer.getLastName());
        assertEquals("Malaysian", customer.getNationality());
        verify(customerRepository).save(customer);
    }
}
