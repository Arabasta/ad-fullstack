import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/error/NotFoundPage';
import LandingPage from "../pages/LandingPage";

const mainRoutes = [
    <Route key="landing" path="/" element={<LandingPage />} />,
    <Route key="home" path="/home" element={<HomePage />} />,
    <Route key="not-found" path="*" element={<NotFoundPage />} />
];

export default mainRoutes;
