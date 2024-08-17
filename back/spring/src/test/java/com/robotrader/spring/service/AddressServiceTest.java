package com.robotrader.spring.service;

import com.robotrader.spring.dto.address.AddressDTO;
import com.robotrader.spring.exception.notFound.AddressNotFoundException;
import com.robotrader.spring.model.Address;
import com.robotrader.spring.model.Customer;
import com.robotrader.spring.repository.AddressRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AddressServiceTest {

    @Mock
    private AddressRepository addressRepository;

    @Mock
    private CustomerService customerService;

    @InjectMocks
    private AddressService addressService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateAddress_Success() {
        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setStreet("123 Main St");
        addressDTO.setCity("Springfield");
        addressDTO.setPostalCode("12345");
        addressDTO.setCountry("Country");
        addressDTO.setUnitNo("12A");

        Address address = addressService.create(addressDTO);

        assertNotNull(address);
        assertEquals("123 Main St", address.getStreet());
        assertEquals("Springfield", address.getCity());
        assertEquals("12345", address.getPostalCode());
        assertEquals("Country", address.getCountry());
        assertEquals("12A", address.getUnitNo());

        verify(addressRepository).save(address);
    }

    @Test
    void testGetAddressByUsername_Success() {
        String username = "user";
        Address address = new Address();
        Customer customer = new Customer();
        customer.setAddress(address);

        when(customerService.getCustomerByUsername(username)).thenReturn(customer);

        Address result = addressService.getAddressByUsername(username);

        assertNotNull(result);
        assertEquals(address, result);
    }

    @Test
    void testGetAddressByUsername_NotFound() {
        String username = "user";
        Customer customer = new Customer();
        customer.setAddress(null);

        when(customerService.getCustomerByUsername(username)).thenReturn(customer);

        assertThrows(AddressNotFoundException.class, () -> {
            addressService.getAddressByUsername(username);
        });
    }

    @Test
    void testGetAddressDTOByUsername_Success() {
        String username = "user";
        Address address = new Address();
        address.setStreet("123 Main St");
        address.setCity("Springfield");
        address.setPostalCode("12345");
        address.setCountry("Country");
        address.setUnitNo("12A");

        Customer customer = new Customer();
        customer.setAddress(address);

        when(customerService.getCustomerByUsername(username)).thenReturn(customer);

        AddressDTO addressDTO = addressService.getAddressDTOByUsername(username);

        assertNotNull(addressDTO);
        assertEquals("123 Main St", addressDTO.getStreet());
        assertEquals("Springfield", addressDTO.getCity());
        assertEquals("12345", addressDTO.getPostalCode());
        assertEquals("Country", addressDTO.getCountry());
        assertEquals("12A", addressDTO.getUnitNo());
    }

    @Test
    void testUpdateAddress_Success() {
        String username = "user";
        Address existingAddress = new Address();
        existingAddress.setStreet("Old St");

        Customer customer = new Customer();
        customer.setAddress(existingAddress);

        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setStreet("New St");
        addressDTO.setCity("New City");
        addressDTO.setPostalCode("54321");
        addressDTO.setCountry("New Country");
        addressDTO.setUnitNo("34B");

        when(customerService.getCustomerByUsername(username)).thenReturn(customer);

        AddressDTO updatedAddressDTO = addressService.update(username, addressDTO);

        assertNotNull(updatedAddressDTO);
        assertEquals("New St", existingAddress.getStreet());
        assertEquals("New City", existingAddress.getCity());
        assertEquals("54321", existingAddress.getPostalCode());
        assertEquals("New Country", existingAddress.getCountry());
        assertEquals("34B", existingAddress.getUnitNo());

        verify(addressRepository).save(existingAddress);
    }

    @Test
    void testSave_Success() {
        Address address = new Address();

        addressService.save(address);

        verify(addressRepository).save(address);
    }
}
