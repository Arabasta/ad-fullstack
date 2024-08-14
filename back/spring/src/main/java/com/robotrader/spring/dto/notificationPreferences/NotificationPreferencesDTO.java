package com.robotrader.spring.dto.notificationPreferences;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationPreferencesDTO {
    private Boolean passwordChangeNotification;
    private Boolean stopLossNotification;
    private Boolean recurringDepositNotification;
}
