import React from 'react';
import { Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import HomePage from '../pages/navbar/HomePage';
import NewsPage from '../pages/navbar/NewsPage';
import NotFoundPage from '../pages/error/NotFoundPage';
import LandingPage from "../pages/navbar/LandingPage";
import WalletPage from "../pages/navbar/WalletPage";
import SupportPage from "../pages/navbar/SupportPage";
import SettingsPage from "../pages/navbar/SettingsPage";
import RecommendedPortfolioTypePage from "../pages/auth/RecommendedPortfolioTypePage";


const mainRoutes = [
    <Route key="landing" path="/" element={<LandingPage />} />,
    <Route key="home" path="/home" element={<HomePage />} />,
    <Route key="login" path="/news" element={<NewsPage />} />,
    <Route key="wallet" path="/wallet" element={<WalletPage />} />,
    <Route key="support" path="/support" element={<SupportPage />} />,
    <Route key="settings" path="/settings" element={<SettingsPage />} />,
    <Route key="dashboard" path="/dashboard" element={<DashboardPage />} />,
    <Route key="recommended-portfolio-type" path="/recommended-portfolio-type" element={<RecommendedPortfolioTypePage />} />,
    <Route key="not-found" path="*" element={<NotFoundPage />} />
];

export default mainRoutes;
