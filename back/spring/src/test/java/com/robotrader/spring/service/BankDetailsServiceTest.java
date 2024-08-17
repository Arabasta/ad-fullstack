package com.robotrader.spring.service;

import com.robotrader.spring.dto.bankDetails.BankDetailsDTO;
import com.robotrader.spring.dto.bankDetails.UpdateBankDetailsDTO;
import com.robotrader.spring.exception.notFound.BankDetailsNotFoundException;
import com.robotrader.spring.model.BankDetails;
import com.robotrader.spring.model.Customer;
import com.robotrader.spring.model.User;
import com.robotrader.spring.repository.BankDetailsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BankDetailsServiceTest {

    @Mock
    private BankDetailsRepository bankDetailsRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private BankDetailsService bankDetailsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindByUsername_Success() {
        String username = "user";
        BankDetails bankDetails = new BankDetails();
        Customer customer = new Customer();
        customer.setBankDetails(bankDetails);
        User user = new User();
        user.setCustomer(customer);

        when(userService.findByUsername(username)).thenReturn(user);

        BankDetails result = bankDetailsService.findByUsername(username);

        assertNotNull(result);
        assertEquals(bankDetails, result);
    }

    @Test
    void testFindByUsername_NotFound() {
        String username = "user";
        Customer customer = new Customer();
        customer.setBankDetails(null);
        User user = new User();
        user.setCustomer(customer);

        when(userService.findByUsername(username)).thenReturn(user);

        assertThrows(BankDetailsNotFoundException.class, () -> {
            bankDetailsService.findByUsername(username);
        });
    }

    @Test
    void testGetBankDetailsDTO_Success() {
        String username = "user";
        BankDetails bankDetails = new BankDetails();
        bankDetails.setId(1L);
        bankDetails.setBankName("BankName");
        bankDetails.setAccountNumber("12345678");
        bankDetails.setAccountHolderName("HolderName");
        Customer customer = new Customer();
        customer.setBankDetails(bankDetails);
        User user = new User();
        user.setCustomer(customer);

        when(userService.findByUsername(username)).thenReturn(user);

        BankDetailsDTO bankDetailsDTO = bankDetailsService.getBankDetailsDTO(username);

        assertNotNull(bankDetailsDTO);
        assertEquals(1L, bankDetailsDTO.getId());
        assertEquals("BankName", bankDetailsDTO.getBankName());
        assertEquals("12345678", bankDetailsDTO.getAccountNumber());
        assertEquals("HolderName", bankDetailsDTO.getAccountHolderName());
    }

    @Test
    void testUpdateBankDetails_Success() {
        String username = "user";
        BankDetails bankDetails = new BankDetails();
        bankDetails.setId(1L);
        Customer customer = new Customer();
        customer.setBankDetails(bankDetails);
        User user = new User();
        user.setCustomer(customer);
        UpdateBankDetailsDTO updateBankDetailsDTO = new UpdateBankDetailsDTO();
        updateBankDetailsDTO.setBankName("UpdatedBankName");
        updateBankDetailsDTO.setAccountNumber("87654321");
        updateBankDetailsDTO.setAccountHolderName("UpdatedHolderName");

        when(userService.findByUsername(username)).thenReturn(user);

        BankDetailsDTO updatedBankDetailsDTO = bankDetailsService.updateBankDetails(username, updateBankDetailsDTO);

        assertNotNull(updatedBankDetailsDTO);
        assertEquals(1L, updatedBankDetailsDTO.getId());
        assertEquals("UpdatedBankName", updatedBankDetailsDTO.getBankName());
        assertEquals("87654321", updatedBankDetailsDTO.getAccountNumber());
        assertEquals("UpdatedHolderName", updatedBankDetailsDTO.getAccountHolderName());

        verify(bankDetailsRepository).save(bankDetails);
    }

    @Test
    void testSave_Success() {
        BankDetails bankDetails = new BankDetails();

        bankDetailsService.save(bankDetails);

        verify(bankDetailsRepository).save(bankDetails);
    }
}
