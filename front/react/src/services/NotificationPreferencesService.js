import axiosInstance from '../config/axios/axiosInstance';

const getNotificationPreferences = async () => {
    return await axiosInstance.get(`/v1/customer/notification-preferences`);
};

const updateNotificationPreference = async (preference, enabled) => {
    return await axiosInstance.post(`/v1/customer/notification-preferences/${preference}?enabled=${enabled}`);
};

const NotificationPreferencesService = {
    getNotificationPreferences,
    updateNotificationPreference,
};

export default NotificationPreferencesService;
