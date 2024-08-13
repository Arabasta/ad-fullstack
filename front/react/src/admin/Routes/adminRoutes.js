import AdminViewUsersPage from "../pages/AdminViewUsersPage";
import { Route } from "react-router-dom";
import ManageTickersPage from "../pages/ManageTickersPage";
import AdminManageLiveTradingPage from "../pages/LiveTrading/AdminManageLiveTradingPage";
import TransactionsPage from "../pages/LiveTrading/TransactionsPage";
import React from "react";
import BackTestPage from "../pages/Backtest/BacktestPage";
import BackTestResultPage from "../pages/Backtest/BackTestResultPage";

const adminRoutes = [
    //<Route key="admin-home" path="/" element={<HomePage />} />,
    <Route key="admin-backTest" path="/backtest" element={<BackTestPage />} />,
    <Route key="admin-backTestResult" path="/backtest-result" element={<BackTestResultPage />} />,
    <Route key="account" path="/admin/manage-user" element={<AdminViewUsersPage />} />,
    <Route key="manage-tickers" path="/admin/manage-tickers" element={<ManageTickersPage />} />,
    <Route key="manageLiveTrading" path="/admin/managelivetrading" element={<AdminManageLiveTradingPage />} />,
    <Route key="transactions" path="/admin/transactions" element={<TransactionsPage />} />,
    //<Route key="not-found" path="*" element={<NotFoundPage />} />,
];

export default adminRoutes;

