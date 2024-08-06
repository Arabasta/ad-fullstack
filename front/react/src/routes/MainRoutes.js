import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NewsPage from '../pages/NewsPage';
import NotFoundPage from '../pages/error/NotFoundPage';
import LandingPage from "../pages/LandingPage";
import WalletPage from "../pages/WalletPage";
import SupportPage from "../pages/SupportPage";
import ProfilePage from "../pages/ProfilePage";
import RecommendedInvestorProfileTypePage from "../pages/auth/RecommendedInvestorProfileTypePage";


const mainRoutes = [
    <Route key="landing" path="/landing" element={<LandingPage />} />,
    <Route key="home" path="/" element={<HomePage />} />,
    <Route key="news" path="/news" element={<NewsPage />} />,
    <Route key="wallet" path="/wallet" element={<WalletPage />} />,
    <Route key="support" path="/support" element={<SupportPage />} />,
    <Route key="profile" path="/profile" element={<ProfilePage />} />,
  //  <Route key="dashboard" path="/dashboard" element={<DashboardPage />} />,
    <Route key="recommended-portfolio-type" path="/recommended-portfolio-type" element={<RecommendedInvestorProfileTypePage />} />,
    <Route key="not-found" path="*" element={<NotFoundPage />} />,
    <Route key="support" path="/support" element={<SupportPage />} />,

];

export default mainRoutes;