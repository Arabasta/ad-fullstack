import React from 'react';
import AccountPage from "../pages/settings/AccountPage";
import FinancialProfilePage from "../pages/settings/FinancialProfilePage";
import NotificationPage from "../pages/settings/NotificationPage";
import PreferenceFormPage from "../pages/settings/PreferenceFormPage";
import {Route} from "react-router-dom";


const settingsRoutes = [
    <Route key="account" path="/settings/account" element={<AccountPage />} />,
    <Route key="financial" path="/settings/financialProfile" element={<FinancialProfilePage />} />,
    <Route key="preference" path="/settings/preferenceForm" element={<PreferenceFormPage />} />,
    <Route key="notification" path="/settings/notification" element={<NotificationPage />} />,
];

export default settingsRoutes;