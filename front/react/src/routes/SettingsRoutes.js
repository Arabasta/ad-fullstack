import React from 'react';
import AccountPage from "../pages/settings/AccountPage";
import FinancialProfilePage from "../pages/settings/FinancialProfilePage";
import NotificationPage from "../pages/settings/NotificationPage";
import InvestorProfilePage from "../pages/settings/InvestorProfilePage";
import AddressPage from "../pages/settings/AddressPage";
import {Route} from "react-router-dom";


const settingsRoutes = [
    <Route key="account" path="/settings/account" element={<AccountPage />} />,
    <Route key="address" path="/settings/address" element={<AddressPage />} />,
    <Route key="financial" path="/settings/financialProfile" element={<FinancialProfilePage />} />,
    <Route key="investor" path="/settings/investorProfile" element={<InvestorProfilePage />} />,
    <Route key="notification" path="/settings/notification" element={<NotificationPage />} />,
];

export default settingsRoutes;