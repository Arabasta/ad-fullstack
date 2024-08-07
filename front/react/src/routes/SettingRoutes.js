import React from 'react';
import {Route} from "react-router-dom";
import EditProfilePage from "../pages/settings/profile/editProfileMain";
import EditBankPage from "../pages/settings/bank/editBankDetails";
import EditNotificationsPage from "../pages/settings/notifications/editNotifications";

const settingRoutes = [
    <Route key="profile" path="/settings/profile" element={<EditProfilePage />} />,
    <Route key="bank" path="/settings/bank" element={<EditBankPage />} />,
    <Route key="notifications" path="/settings/notifications" element={<EditNotificationsPage/>} />,
];

export default settingRoutes;