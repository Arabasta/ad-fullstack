import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from "../archive/LandingPage";
import WalletPage from "../pages/WalletPage";
import SettingsPage from "../pages/settings/SettingsPage";
import BackTestPage from "../admin/pages/Backtest/BacktestPage";
import BackTestResultPage from "../admin/pages/Backtest/BackTestResultPage";

const mainRoutes = [

    <Route key="customer-backTest" path="/backtest" element={<BackTestPage />} />,
    <Route key="customer-backTestResult" path="/backtest-result" element={<BackTestResultPage />} />,
    <Route key="landing" path="/landing" element={<LandingPage />} />,
    <Route key="wallet" path="/wallet" element={<WalletPage />} />,
    <Route key="settings" path="/settings" element={<SettingsPage />} />,
    // <Route key="support" path="/support" element={<SupportPage />} />,
    // <Route key="news" path="/news" element={<NewsPage />} />,
    // <Route key="not-found" path="*" element={<NotFoundPage />} />,
    // <Route key="customer-home" path="/" element={<HomePage />} />,

    //  <Route key="dashboard" path="/dashboard" element={<DashboardPage />} />,

];

export default mainRoutes;