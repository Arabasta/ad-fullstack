import React from 'react';
import {Route} from "react-router-dom";
import NewsPage from "../pages/navbar/NewsPage";
import SupportPage from "../pages/navbar/SupportPage";
import WalletPage from "../pages/navbar/WalletPage";
import SettingsPage from "../pages/navbar/SettingsPage";
import WalletTransactionHistoryPage from "../pages/wallet/WalletTransactionHistoryPage";
import PortfolioTransactionHistoryPage from "../pages/portfolio/PortfolioTransactionHistoryPage";

const mainRoutes = [
    <Route key="news" path="/news" element={<NewsPage />} />,
    <Route key="support" path="/support" element={<SupportPage />} />,
    <Route key="wallet" path="/wallet" element={<WalletPage />} />,
    <Route key="settings" path="/settings" element={<SettingsPage />} />,
    <Route key="walletHistory" path="/wallet/history" element={<WalletTransactionHistoryPage />} />,
    // Temporary, to pass in portfolio type when portfolio pages are up
    <Route key="portfolioHistory" path="/portfolio/history" element={<PortfolioTransactionHistoryPage portfolioType="MODERATE" />} />
];

export default mainRoutes;