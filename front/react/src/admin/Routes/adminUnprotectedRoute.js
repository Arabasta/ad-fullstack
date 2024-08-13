import { Route } from "react-router-dom";
import React from "react";
import HomePage from "../../pages/HomePage";
import NotFoundPage from "../../pages/error/NotFoundPage";

const adminProtectedRoutes = [
    <Route key="admin-home" path="/" element={<HomePage />} />,
    <Route key="not-found" path="*" element={<NotFoundPage />} />,
];

export default adminProtectedRoutes;