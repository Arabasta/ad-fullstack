package com.robotrader.spring.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AddressTest {
    @Test
    public void testGetStreet() {
        Address address = new Address();
        address.setStreet("Orchard Road");
        String street = address.getStreet();
        assertEquals("Orchard Road", street);
    }

    @Test
    public void testSetStreet() {
        Address address = new Address();
        address.setStreet("Orchard Road");
        assertEquals("Orchard Road", address.getStreet());
    }

    @Test
    public void testGetCity() {
        Address address = new Address();
        address.setCity("Singapore");
        String city = address.getCity();
        assertEquals("Singapore", city);
    }

    @Test
    public void testSetCity() {
        Address address = new Address();
        address.setCity("Singapore");
        assertEquals("Singapore", address.getCity());
    }

    @Test
    public void testGetPostalCode() {
        Address address = new Address();
        address.setPostalCode("123456");
        String postalCode = address.getPostalCode();
        assertEquals("123456", postalCode);
    }

    @Test
    public void testSetPostalCode() {
        Address address = new Address();
        address.setPostalCode("12345");
        assertEquals("12345", address.getPostalCode());
    }

    @Test
    public void testGetCountry() {
        Address address = new Address();
        address.setCountry("Singapore");
        String country = address.getCountry();
        assertEquals("Singapore", country);
    }

    @Test
    public void testSetCountry() {
        Address address = new Address();
        address.setCountry("Singapore");
        assertEquals("Singapore", address.getCountry());
    }

    @Test
    public void testGetUnitNo() {
        Address address = new Address();
        address.setUnitNo("#01-01");
        String unitNo = address.getUnitNo();
        assertEquals("#01-01", unitNo);
    }

    @Test
    public void testSetUnitNo() {
        Address address = new Address();
        address.setUnitNo("#01-01");
        assertEquals("#01-01", address.getUnitNo());
    }

    @Test
    public void testAddressConstructorWithParameters() {
        Address address = new Address(1L, "Orchard Road", "Singapore", "123456", "Singapore", "#01-01");
        assertEquals("Orchard Road", address.getStreet());
        assertEquals("Singapore", address.getCity());
        assertEquals("123456", address.getPostalCode());
        assertEquals("Singapore", address.getCountry());
        assertEquals("#01-01", address.getUnitNo());
    }

    @Test
    public void testAddressDefaultConstructor() {
        Address address = new Address();
        assertEquals(null, address.getStreet());
        assertEquals(null, address.getCity());
        assertEquals(null, address.getPostalCode());
        assertEquals(null, address.getCountry());
        assertEquals(null, address.getUnitNo());
    }
}
