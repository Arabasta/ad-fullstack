import AdminViewUsersPage from "../pages/AdminViewUsersPage";
import {Route} from "react-router-dom";
import BackTestPage from "../pages/BacktestPage";
import React from "react";
import BackTestResultPage from "../pages/BackTestResultPage";
import AdminManageLiveTradingPage from "../pages/AdminManageLiveTradingPage";

const adminRoutes = [
    <Route key="account" path="/admin/manage-user" element={<AdminViewUsersPage />} />,
    <Route key="backTest" path="/admin/backtest" element={<BackTestPage />} />,
    <Route key="manageLiveTrading" path="/admin/managelivetrading" element={<AdminManageLiveTradingPage />} />,
    <Route path="/admin/backtest-result" element={<BackTestResultPage />} />

];

export default adminRoutes;