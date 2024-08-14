package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.notificationPreferences.NotificationPreferencesDTO;
import com.robotrader.spring.model.NotificationPreferences;

public interface INotificationPreferencesService {
    void save(NotificationPreferences notificationPreferences);

    NotificationPreferences getNotificationPreferences(String username);

    NotificationPreferencesDTO getNotificationPreferencesDTO(String username);

    void updatePasswordChangeNotification(String username, Boolean enabled);

    void updateStopLossNotification(String username, Boolean enabled);

    void updateRecurringDepositNotification(String username, Boolean enabled);
}
