import React from 'react';
import {Route} from "react-router-dom";
import NewsPage from "../../../pages/NewsPage";
import SupportPage from "../../../pages/SupportPage";
import WalletPage from "../../../pages/WalletPage";
import SettingsPageArchived from "../../../archive/pages/SettingsPageArchived";
import CustomerDetailsPage from "../../../pages/CustomerDetailsPage";
import SettingsPage from "../../../pages/settings/SettingsPage";

const mainRoutes = [
    <Route key="news" path="/news" element={<NewsPage />} />,
    <Route key="support" path="/support" element={<SupportPage />} />,
    <Route key="wallet" path="/wallet" element={<WalletPage />} />,
    <Route key="settings" path="/settings" element={<SettingsPage />} />,
    <Route key="customerDetails" path="/customer/details" element={<CustomerDetailsPage />} />
];

export default mainRoutes;