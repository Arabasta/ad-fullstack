import React from 'react';
import { Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/error/NotFoundPage';
import LandingPage from "../pages/LandingPage";

const mainRoutes = [
    <Route key="landing" path="/" element={<LandingPage />} />,
    <Route key="dashboard" path="/dashboard" element={<DashboardPage />} />,
    <Route key="not-found" path="*" element={<NotFoundPage />} />
];

export default mainRoutes;
