package com.robotrader.spring.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class BankDetailsTest {
    @Test
    public void testGetId() {
        BankDetails bankDetails = new BankDetails();
        bankDetails.setId(1L);
        assertEquals(1L, bankDetails.getId());
    }

    @Test
    public void testGetBankName() {
        BankDetails bankDetails = new BankDetails();
        bankDetails.setBankName("DBS");
        String bankName = bankDetails.getBankName();
        assertEquals("DBS", bankName);
    }

    @Test
    public void testSetBankName() {
        BankDetails bankDetails = new BankDetails();
        bankDetails.setBankName("DBS");
        assertEquals("DBS", bankDetails.getBankName());
    }

    @Test
    public void testGetAccountNumber() {
        BankDetails bankDetails = new BankDetails();
        bankDetails.setAccountNumber("125-456-789");
        String accountNumber = bankDetails.getAccountNumber();
        assertEquals("125-456-789", accountNumber);
    }

    @Test
    public void testSetAccountNumber() {
        BankDetails bankDetails = new BankDetails();
        bankDetails.setAccountNumber("125-456-789");
        assertEquals("125-456-789", bankDetails.getAccountNumber());
    }

    @Test
    public void testGetAccountHolderName() {
        BankDetails bankDetails = new BankDetails();
        bankDetails.setAccountHolderName("John Doe");
        String accountHolderName = bankDetails.getAccountHolderName();
        assertEquals("John Doe", accountHolderName);
    }

    @Test
    public void testSetAccountHolderName() {
        BankDetails bankDetails = new BankDetails();
        bankDetails.setAccountHolderName("John Doe");
        assertEquals("John Doe", bankDetails.getAccountHolderName());
    }

    @Test
    public void testBankDetailsConstructorWithParameters() {
        BankDetails bankDetails = new BankDetails(1L, "DBS", "125-456-789", "John Doe");
        assertEquals("DBS", bankDetails.getBankName());
        assertEquals("125-456-789", bankDetails.getAccountNumber());
        assertEquals("John Doe", bankDetails.getAccountHolderName());
    }

    @Test
    public void testBankDetailsDefaultConstructor() {
        BankDetails bankDetails = new BankDetails();
        assertEquals(null, bankDetails.getBankName());
        assertEquals(null, bankDetails.getAccountNumber());
        assertEquals(null, bankDetails.getAccountHolderName());
    }
}
