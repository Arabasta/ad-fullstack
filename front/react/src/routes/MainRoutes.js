import React from 'react';
import { Route } from 'react-router-dom';
import WalletPage from "../pages/WalletPage";
import SettingsPage from "../pages/settings/SettingsPage";
import BackTestPage from "../admin/pages/Backtest/BacktestPage";
import BackTestResultPage from "../admin/pages/Backtest/BackTestResultPage";

const mainRoutes = [

    <Route key="customer-backTest" path="/backtest" element={<BackTestPage />} />,
    <Route key="customer-backTestResult" path="/backtest-result" element={<BackTestResultPage />} />,
    <Route key="wallet" path="/wallet" element={<WalletPage />} />,
    <Route key="settings" path="/settings" element={<SettingsPage />} />,
];

export default mainRoutes;