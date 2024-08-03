import React from 'react';
import {Route} from "react-router-dom";
import NewsPage from "../pages/NewsPage";
import SupportPage from "../pages/SupportPage";
import WalletPage from "../pages/WalletPage";
import WalletTransactionHistoryPage from "../pages/wallet/WalletTransactionHistoryPage";
import PortfolioTransactionHistoryPage from "../pages/portfolio/PortfolioTransactionHistoryPage";
import CustomerDetailsPage from "../pages/CustomerDetailsPage";
import ProfilePage from "../pages/ProfilePage";

const naviRoutes = [
    <Route key="news" path="/news" element={<NewsPage />} />,
    <Route key="support" path="/support" element={<SupportPage />} />,
    <Route key="wallet" path="/wallet" element={<WalletPage />} />,
    <Route key="profile" path="/profile" element={<ProfilePage />} />,
    <Route key="walletHistory" path="/wallet/history" element={<WalletTransactionHistoryPage />} />,
    // Temporary, to pass in portfolio type when portfolio pages are up
    <Route key="portfolioHistory" path="/portfolio/history" element={<PortfolioTransactionHistoryPage portfolioType="MODERATE" />} />,
    <Route key="customerDetails" path="/customer/details" element={<CustomerDetailsPage />} />

];

export default naviRoutes;