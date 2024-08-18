package com.robotrader.spring.model;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class CustomerTest {
    @Test
    public void testGetId() {
        Customer customer = new Customer();
        customer.setId(1L);
        assertEquals(1L, customer.getId());
    }

    @Test
    public void testGetFinancialProfile() {
        Customer customer = new Customer();
        FinancialProfile financialProfile = new FinancialProfile();
        customer.setFinancialProfile(financialProfile);
        assertEquals(financialProfile, customer.getFinancialProfile());
    }

    @Test
    public void testSetFinancialProfile() {
        Customer customer = new Customer();
        FinancialProfile financialProfile = new FinancialProfile();
        customer.setFinancialProfile(financialProfile);
        assertEquals(financialProfile, customer.getFinancialProfile());
    }

    @Test
    public void testGetInvestorProfile() {
        Customer customer = new Customer();
        InvestorProfile investorProfile = new InvestorProfile();
        customer.setInvestorProfile(investorProfile);
        assertEquals(investorProfile, customer.getInvestorProfile());
    }

    @Test
    public void testSetInvestorProfile() {
        Customer customer = new Customer();
        InvestorProfile investorProfile = new InvestorProfile();
        customer.setInvestorProfile(investorProfile);
        assertEquals(investorProfile, customer.getInvestorProfile());
    }

    @Test
    public void testGetWallet() {
        Customer customer = new Customer();
        Wallet wallet = new Wallet();
        customer.setWallet(wallet);
        assertEquals(wallet, customer.getWallet());
    }

    @Test
    public void testSetWallet() {
        Customer customer = new Customer();
        Wallet wallet = new Wallet();
        customer.setWallet(wallet);
        assertEquals(wallet, customer.getWallet());
    }

    @Test
    public void testGetPortfolios() {
        Customer customer = new Customer();
        List<Portfolio> portfolios = new ArrayList<>();
        customer.setPortfolios(portfolios);
        assertEquals(portfolios, customer.getPortfolios());
    }

    @Test
    public void testSetPortfolios() {
        Customer customer = new Customer();
        List<Portfolio> portfolios = new ArrayList<>();
        customer.setPortfolios(portfolios);
        assertEquals(portfolios, customer.getPortfolios());
    }

    @Test
    public void testGetAddress() {
        Customer customer = new Customer();
        Address address = new Address();
        customer.setAddress(address);
        assertEquals(address, customer.getAddress());
    }

    @Test
    public void testSetAddress() {
        Customer customer = new Customer();
        Address address = new Address();
        customer.setAddress(address);
        assertEquals(address, customer.getAddress());
    }

    @Test
    public void testGetBankDetails() {
        Customer customer = new Customer();
        BankDetails bankDetails = new BankDetails();
        customer.setBankDetails(bankDetails);
        assertEquals(bankDetails, customer.getBankDetails());
    }

    @Test
    public void testSetBankDetails() {
        Customer customer = new Customer();
        BankDetails bankDetails = new BankDetails();
        customer.setBankDetails(bankDetails);
        assertEquals(bankDetails, customer.getBankDetails());
    }

    @Test
    public void testGetNotificationPreferences() {
        Customer customer = new Customer();
        NotificationPreferences notificationPreferences = new NotificationPreferences();
        customer.setNotificationPreferences(notificationPreferences);
        assertEquals(notificationPreferences, customer.getNotificationPreferences());
    }

    @Test
    public void testSetNotificationPreferences() {
        Customer customer = new Customer();
        NotificationPreferences notificationPreferences = new NotificationPreferences();
        customer.setNotificationPreferences(notificationPreferences);
        assertEquals(notificationPreferences, customer.getNotificationPreferences());
    }

    @Test
    public void testGetMobileNumber() {
        Customer customer = new Customer();
        customer.setMobileNumber("91234567");
        assertEquals("91234567", customer.getMobileNumber());
    }

    @Test
    public void testSetMobileNumber() {
        Customer customer = new Customer();
        customer.setMobileNumber("91234567");
        assertEquals("91234567", customer.getMobileNumber());
    }

    @Test
    public void testGetFirstName() {
        Customer customer = new Customer();
        customer.setFirstName("John");
        assertEquals("John", customer.getFirstName());
    }

    @Test
    public void testSetFirstName() {
        Customer customer = new Customer();
        customer.setFirstName("John");
        assertEquals("John", customer.getFirstName());
    }

    @Test
    public void testGetLastName() {
        Customer customer = new Customer();
        customer.setLastName("Doe");
        assertEquals("Doe", customer.getLastName());
    }

    @Test
    public void testSetLastName() {
        Customer customer = new Customer();
        customer.setLastName("Doe");
        assertEquals("Doe", customer.getLastName());
    }

    @Test
    public void testGetNationality() {
        Customer customer = new Customer();
        customer.setNationality("Singaporean");
        assertEquals("Singaporean", customer.getNationality());
    }

    @Test
    public void testSetNationality() {
        Customer customer = new Customer();
        customer.setNationality("Singaporean");
        assertEquals("Singaporean", customer.getNationality());
    }

    @Test
    public void testCustomerConstructorWithParameters() {
        FinancialProfile financialProfile = new FinancialProfile();
        InvestorProfile investorProfile = new InvestorProfile();
        Wallet wallet = new Wallet();
        List<Portfolio> portfolios = new ArrayList<>();
        Address address = new Address();
        BankDetails bankDetails = new BankDetails();
        NotificationPreferences notificationPreferences = new NotificationPreferences();

        Customer customer = new Customer(1L, financialProfile, investorProfile, wallet, portfolios, address, bankDetails, notificationPreferences, "91234567", "John", "Doe", "Singaporean");

        assertNotNull(customer);
        assertEquals(financialProfile, customer.getFinancialProfile());
        assertEquals(investorProfile, customer.getInvestorProfile());
        assertEquals(wallet, customer.getWallet());
        assertEquals(portfolios, customer.getPortfolios());
        assertEquals(address, customer.getAddress());
        assertEquals(bankDetails, customer.getBankDetails());
        assertEquals(notificationPreferences, customer.getNotificationPreferences());
        assertEquals("91234567", customer.getMobileNumber());
        assertEquals("John", customer.getFirstName());
        assertEquals("Doe", customer.getLastName());
        assertEquals("Singaporean", customer.getNationality());
    }

    @Test
    public void testCustomerDefaultConstructor() {
        Customer customer = new Customer();
        assertEquals(null, customer.getFinancialProfile());
        assertEquals(null, customer.getInvestorProfile());
        assertEquals(null, customer.getWallet());
        assertEquals(null, customer.getPortfolios());
        assertEquals(null, customer.getAddress());
        assertEquals(null, customer.getBankDetails());
        assertEquals(null, customer.getNotificationPreferences());
        assertEquals(null, customer.getMobileNumber());
        assertEquals(null, customer.getFirstName());
        assertEquals(null, customer.getLastName());
        assertEquals(null, customer.getNationality());
    }
}
