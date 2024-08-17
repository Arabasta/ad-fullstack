package com.robotrader.spring.service;

import com.robotrader.spring.dto.notificationPreferences.NotificationPreferencesDTO;
import com.robotrader.spring.model.Customer;
import com.robotrader.spring.model.NotificationPreferences;
import com.robotrader.spring.repository.NotificationPreferencesRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class NotificationPreferencesServiceTest {

    @Mock
    private NotificationPreferencesRepository notificationPreferencesRepository;

    @Mock
    private CustomerService customerService;

    @InjectMocks
    private NotificationPreferencesService notificationPreferencesService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetNotificationPreferences_Success() {
        String username = "user";
        NotificationPreferences notificationPreferences = new NotificationPreferences();
        Customer customer = new Customer();
        customer.setNotificationPreferences(notificationPreferences);

        when(customerService.getCustomerByUsername(username)).thenReturn(customer);

        NotificationPreferences result = notificationPreferencesService.getNotificationPreferences(username);

        assertNotNull(result);
        assertEquals(notificationPreferences, result);
    }

    @Test
    void testGetNotificationPreferencesDTO_Success() {
        String username = "user";
        NotificationPreferences notificationPreferences = new NotificationPreferences();
        notificationPreferences.setPasswordChangeNotification(true);
        notificationPreferences.setStopLossNotification(true);
        notificationPreferences.setRecurringDepositNotification(false);

        Customer customer = new Customer();
        customer.setNotificationPreferences(notificationPreferences);

        when(customerService.getCustomerByUsername(username)).thenReturn(customer);

        NotificationPreferencesDTO result = notificationPreferencesService.getNotificationPreferencesDTO(username);

        assertNotNull(result);
        assertTrue(result.getPasswordChangeNotification());
        assertTrue(result.getStopLossNotification());
        assertFalse(result.getRecurringDepositNotification());
    }

    @Test
    void testUpdatePasswordChangeNotification_Success() {
        String username = "user";
        NotificationPreferences notificationPreferences = new NotificationPreferences();
        Customer customer = new Customer();
        customer.setNotificationPreferences(notificationPreferences);

        when(customerService.getCustomerByUsername(username)).thenReturn(customer);

        notificationPreferencesService.updatePasswordChangeNotification(username, true);

        assertTrue(notificationPreferences.getPasswordChangeNotification());

        verify(notificationPreferencesRepository).save(notificationPreferences);
    }

    @Test
    void testUpdateStopLossNotification_Success() {
        String username = "user";
        NotificationPreferences notificationPreferences = new NotificationPreferences();
        Customer customer = new Customer();
        customer.setNotificationPreferences(notificationPreferences);

        when(customerService.getCustomerByUsername(username)).thenReturn(customer);

        notificationPreferencesService.updateStopLossNotification(username, false);

        assertFalse(notificationPreferences.getStopLossNotification());

        verify(notificationPreferencesRepository).save(notificationPreferences);
    }

    @Test
    void testUpdateRecurringDepositNotification_Success() {
        String username = "user";
        NotificationPreferences notificationPreferences = new NotificationPreferences();
        Customer customer = new Customer();
        customer.setNotificationPreferences(notificationPreferences);

        when(customerService.getCustomerByUsername(username)).thenReturn(customer);

        notificationPreferencesService.updateRecurringDepositNotification(username, true);

        assertTrue(notificationPreferences.getRecurringDepositNotification());

        verify(notificationPreferencesRepository).save(notificationPreferences);
    }

    @Test
    void testSaveNotificationPreferences_Success() {
        NotificationPreferences notificationPreferences = new NotificationPreferences();

        notificationPreferencesService.save(notificationPreferences);

        verify(notificationPreferencesRepository).save(notificationPreferences);
    }
}
