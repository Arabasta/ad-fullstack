package com.robotrader.spring.controller.customer;

import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.notificationPreferences.NotificationPreferencesDTO;
import com.robotrader.spring.service.NotificationPreferencesService;
import com.robotrader.spring.service.interfaces.INotificationPreferencesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customer/notification-preferences")
public class NotificationPreferencesControllerV1 {

    private final INotificationPreferencesService notificationPreferencesService;

    @Autowired
    public NotificationPreferencesControllerV1(NotificationPreferencesService notificationPreferencesService) {
        this.notificationPreferencesService = notificationPreferencesService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<NotificationPreferencesDTO>> getPreferences(Authentication authentication) {
        String username = authentication.getName();
        NotificationPreferencesDTO response = notificationPreferencesService.getNotificationPreferencesDTO(username);
        return ResponseEntity.ok(new ApiResponse<>("success", "Notification preferences retrieved", response));
    }

    @PostMapping("/password-change")
    public ResponseEntity<ApiResponse<Void>> updatePasswordChangeNotification(Authentication authentication,
                                                                              @RequestParam Boolean enabled) {
        String username = authentication.getName();
        notificationPreferencesService.updatePasswordChangeNotification(username, enabled);
        return ResponseEntity.ok(new ApiResponse<>("success", "Password change notification preference updated", null));
    }

    @PostMapping("/stop-loss")
    public ResponseEntity<ApiResponse<Void>> updateStopLossNotification(Authentication authentication,
                                                                        @RequestParam Boolean enabled) {
        String username = authentication.getName();
        notificationPreferencesService.updateStopLossNotification(username, enabled);
        return ResponseEntity.ok(new ApiResponse<>("success", "Stop loss notification preference updated", null));
    }

    @PostMapping("/recurring-deposit")
    public ResponseEntity<ApiResponse<Void>> updateRecurringDepositNotification(Authentication authentication,
                                                                                @RequestParam Boolean enabled) {
        String username = authentication.getName();
        notificationPreferencesService.updateRecurringDepositNotification(username, enabled);
        return ResponseEntity.ok(new ApiResponse<>("success", "Recurring deposit notification preference updated", null));
    }
}
