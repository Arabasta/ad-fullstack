import React from 'react';
import AccountPage from "../pages/profile/AccountPage";
import FinancialProfilePage from "../pages/profile/FinancialProfilePage";
import NotificationPage from "../pages/profile/NotificationPage";
import InvestorProfilePage from "../pages/profile/InvestorProfilePage";
import AddressPage from "../pages/profile/AddressPage";
import {Route} from "react-router-dom";


const profileRoutes = [
    <Route key="account" path="/profile/account" element={<AccountPage />} />,
    <Route key="address" path="/profile/address" element={<AddressPage />} />,
    <Route key="financial" path="/profile/financialProfile" element={<FinancialProfilePage />} />,
    <Route key="investor" path="/profile/investorProfile" element={<InvestorProfilePage />} />,
    <Route key="notification" path="/profile/notification" element={<NotificationPage />} />,
];

export default profileRoutes;