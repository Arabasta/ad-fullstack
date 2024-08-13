import React from 'react';
import { Route } from 'react-router-dom';
import NewsPage from '../pages/NewsPage';
import LandingPage from "../pages/LandingPage";
import WalletPage from "../pages/WalletPage";
import SupportPage from "../pages/SupportPage";
import SettingsPage from "../pages/settings/SettingsPage";
import HomePage from "../pages/HomePage";
import BackTestPage from "../admin/pages/Backtest/BacktestPage";
import BackTestResultPage from "../admin/pages/Backtest/BackTestResultPage";
import NotFoundPage from "../pages/error/NotFoundPage";

const mainRoutes = [
    <Route key="customer-home" path="/" element={<HomePage />} />,
    <Route key="customer-backTest" path="/backtest" element={<BackTestPage />} />,
    <Route key="customer-backTestResult" path="/backtest-result" element={<BackTestResultPage />} />,
    <Route key="landing" path="/landing" element={<LandingPage />} />,
    <Route key="wallet" path="/wallet" element={<WalletPage />} />,
    <Route key="settings" path="/settings" element={<SettingsPage />} />,
    <Route key="support" path="/support" element={<SupportPage />} />,
    <Route key="news" path="/news" element={<NewsPage />} />,
    <Route key="not-found" path="*" element={<NotFoundPage />} />,

    //  <Route key="dashboard" path="/dashboard" element={<DashboardPage />} />,

];

export default mainRoutes;