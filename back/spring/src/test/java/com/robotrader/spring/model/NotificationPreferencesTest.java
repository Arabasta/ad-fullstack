package com.robotrader.spring.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class NotificationPreferencesTest {
    @Test
    public void testGetPasswordChangeNotification() {
        NotificationPreferences preferences = new NotificationPreferences();
        preferences.setPasswordChangeNotification(false);
        assertEquals(false, preferences.getPasswordChangeNotification());
    }

    @Test
    public void testSetPasswordChangeNotification() {
        NotificationPreferences preferences = new NotificationPreferences();
        preferences.setPasswordChangeNotification(false);
        assertEquals(false, preferences.getPasswordChangeNotification());
    }

    @Test
    public void testGetStopLossNotification() {
        NotificationPreferences preferences = new NotificationPreferences();
        preferences.setStopLossNotification(false);
        assertEquals(false, preferences.getStopLossNotification());
    }

    @Test
    public void testSetStopLossNotification() {
        NotificationPreferences preferences = new NotificationPreferences();
        preferences.setStopLossNotification(false);
        assertEquals(false, preferences.getStopLossNotification());
    }

    @Test
    public void testGetRecurringDepositNotification() {
        NotificationPreferences preferences = new NotificationPreferences();
        preferences.setRecurringDepositNotification(false);
        assertEquals(false, preferences.getRecurringDepositNotification());
    }

    @Test
    public void testSetRecurringDepositNotification() {
        NotificationPreferences preferences = new NotificationPreferences();
        preferences.setRecurringDepositNotification(false);
        assertEquals(false, preferences.getRecurringDepositNotification());
    }

    @Test
    public void testNotificationPreferencesConstructorWithParameters() {
        NotificationPreferences preferences = new NotificationPreferences(
                1L,
                false,
                true,
                false
        );

        assertEquals(1L, preferences.getId());
        assertEquals(false, preferences.getPasswordChangeNotification());
        assertEquals(true, preferences.getStopLossNotification());
        assertEquals(false, preferences.getRecurringDepositNotification());
    }

    @Test
    public void testNotificationPreferencesDefaultConstructor() {
        NotificationPreferences preferences = new NotificationPreferences();
        assertEquals(true, preferences.getPasswordChangeNotification());
        assertEquals(true, preferences.getStopLossNotification());
        assertEquals(true, preferences.getRecurringDepositNotification());
    }
}
