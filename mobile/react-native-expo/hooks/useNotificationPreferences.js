import { useState, useEffect } from 'react';
import NotificationPreferencesService from '../services/NotificationPreferencesService';

const useNotificationPreferences = () => {
    const [notificationPreferences, setNotificationPreferences] = useState({
        passwordChangeNotification: false,
        stopLossNotification: false,
        recurringDepositNotification: false,
    });

    const getNotificationPreferences = async () => {
        try {
            const response = await NotificationPreferencesService.getNotificationPreferences();
            setNotificationPreferences(response.data.data);
        } catch (error) {
            console.error('Error fetching notification preferences', error);
        }
    };

    const updateNotificationPreference = async (preference, enabled) => {
        try {
            await NotificationPreferencesService.updateNotificationPreference(preference, enabled);
            await getNotificationPreferences();
        } catch (error) {
            console.error('Error updating notification preference', error);
        }
    };

    useEffect(() => {
        getNotificationPreferences();
    }, []);

    return {
        notificationPreferences,
        updateNotificationPreference,
    };
};

export default useNotificationPreferences;
