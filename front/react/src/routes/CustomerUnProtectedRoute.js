import React from 'react';
import { Route } from 'react-router-dom';
import NewsPage from '../pages/NewsPage';
import SupportPage from "../pages/SupportPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/error/NotFoundPage";

const customerUnProtectedRoutes = [
     <Route key="support" path="/support" element={<SupportPage />} />,
     <Route key="news" path="/news" element={<NewsPage />} />,
     <Route key="not-found" path="*" element={<NotFoundPage />} />,
     <Route key="customer-home" path="/" element={<HomePage />} />,
];

export default customerUnProtectedRoutes;