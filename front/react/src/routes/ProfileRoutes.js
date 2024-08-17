import React from 'react';
import AccountPage from "../pages/profile/AccountPage";
import FinancialProfilePage from "../pages/profile/FinancialProfilePage";
import NotificationPage from "../pages/profile/NotificationPage";
import InvestorProfilePage from "../pages/profile/InvestorProfilePage";
import {Route} from "react-router-dom";
import UpdateCustomerPhoneNumber from "../components/customer/UpdateCustomerPhoneNumber";
import BankDetailsPage from "../pages/profile/BankDetailsPage";

const profileRoutes = [
    <Route key="account" path="/profile/account" element={<AccountPage />} />,
    <Route key="financial" path="/profile/financialProfile" element={<FinancialProfilePage />} />,
    <Route key="investor" path="/profile/investorProfile" element={<InvestorProfilePage />} />,
    <Route key="notification" path="/profile/notification" element={<NotificationPage />} />,
    <Route key="updatePhoneNum" path="/profile/update-mobile-number" element={<UpdateCustomerPhoneNumber />} />,
    <Route key="bankDetails" path="/profile/bankDetails" element={<BankDetailsPage />} />,
];

export default profileRoutes;