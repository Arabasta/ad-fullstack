import React from 'react';
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import AccountPage from "../pages/settings/AccountPage";
import FinancialProfilePage from "../pages/settings/FinancialProfilePage";
import NotFoundPage from "../pages/error/NotFoundPage";
import NotificationPage from "../pages/settings/NotificationPage";
import PreferenceFormPage from "../pages/settings/PreferenceFormPage";


const settingsRoutes = [
    <Route key="account" path="/settings/account" element={<AccountPage />} />,
    <Route key="financial" path="/settings/financialProfile" element={<FinancialProfilePage />} />,
    <Route key="preference" path="/settings/preferenceForm" element={<PreferenceFormPage />} />,
    <Route key="notification" path="/settings/notification" element={<NotificationPage />} />,
    <Route key="not-found" path="*" element={<NotFoundPage />} />
];

export default settingsRoutes;