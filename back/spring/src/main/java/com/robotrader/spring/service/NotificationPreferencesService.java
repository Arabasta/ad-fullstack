package com.robotrader.spring.service;

import com.robotrader.spring.dto.notificationPreferences.NotificationPreferencesDTO;
import com.robotrader.spring.model.NotificationPreferences;
import com.robotrader.spring.repository.NotificationPreferencesRepository;
import com.robotrader.spring.service.interfaces.INotificationPreferencesService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class NotificationPreferencesService implements INotificationPreferencesService {

    private final NotificationPreferencesRepository notificationPreferencesRepository;
    private final CustomerService customerService;

    @Autowired
    public NotificationPreferencesService(NotificationPreferencesRepository notificationPreferencesRepository,
                                          @Lazy CustomerService customerService) {
        this.notificationPreferencesRepository = notificationPreferencesRepository;
        this.customerService = customerService;
    }

    @Override
    @Transactional
    public void save(NotificationPreferences notificationPreferences) {
        notificationPreferencesRepository.save(notificationPreferences);
    }

    @Override
    public NotificationPreferences getNotificationPreferences(String username) {
        return customerService.getCustomerByUsername(username).getNotificationPreferences();
    }

    @Override
    public NotificationPreferencesDTO getNotificationPreferencesDTO(String username) {
        NotificationPreferences notificationPreferences = customerService.getCustomerByUsername(username).getNotificationPreferences();
        return new NotificationPreferencesDTO(notificationPreferences.getPasswordChangeNotification(),
                                               notificationPreferences.getStopLossNotification(),
                                               notificationPreferences.getRecurringDepositNotification());
    }

    @Override
    @Transactional
    public void updatePasswordChangeNotification(String username, Boolean enabled) {
        NotificationPreferences notificationPreferences = customerService.getCustomerByUsername(username).getNotificationPreferences();
        notificationPreferences.setPasswordChangeNotification(enabled);
        notificationPreferencesRepository.save(notificationPreferences);
    }

    @Override
    @Transactional
    public void updateStopLossNotification(String username, Boolean enabled) {
        NotificationPreferences notificationPreferences = customerService.getCustomerByUsername(username).getNotificationPreferences();
        notificationPreferences.setStopLossNotification(enabled);
        notificationPreferencesRepository.save(notificationPreferences);
    }

    @Override
    @Transactional
    public void updateRecurringDepositNotification(String username, Boolean enabled) {
        NotificationPreferences notificationPreferences = customerService.getCustomerByUsername(username).getNotificationPreferences();
        notificationPreferences.setRecurringDepositNotification(enabled);
        notificationPreferencesRepository.save(notificationPreferences);
    }
}
