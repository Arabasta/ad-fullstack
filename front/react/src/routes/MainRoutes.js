import React from 'react';
import { Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/error/NotFoundPage';
import LandingPage from "../pages/navbar/LandingPage";

const mainRoutes = [
    <Route key="landing" path="/" element={<LandingPage />} />,
    <Route key="home" path="/home" element={<HomePage />} />,
    <Route key="login" path="/news" element={<NewsPage />} />,
    <Route key="wallet" path="/wallet" element={<WalletPage />} />,
    <Route key="support" path="/support" element={<SupportPage />} />,
    <Route key="settings" path="/settings" element={<SettingsPage />} />,
    <Route key="dashboard" path="/dashboard" element={<DashboardPage />} />,
    <Route key="not-found" path="*" element={<NotFoundPage />} />
];

export default mainRoutes;
