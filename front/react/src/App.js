import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './config/context/AuthContext';
import ErrorBoundary from './components/common/alerts/ErrorBoundary';
import authRoutes from './routes/AuthRoutes';
import mainRoutes from './routes/MainRoutes';
import profileRoutes from './routes/ProfileRoutes';
import NavigationBarRoutes from "./components/common/navbar/NavigationBarRoutes";
import portfolioRoutes from './routes/PortfolioRoutes';
import Header from "./components/common/layout/Header";
import Footer from "./components/common/layout/Footer";
import AdminRoutes from "./admin/Routes/adminRoutes";
import settingRoutes from "./routes/SettingRoutes";

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
};

const AppContent = () => {
    return (
        <>
            <Header />
            <ErrorBoundary>
                <Routes>
                    {NavigationBarRoutes}
                    {authRoutes}
                    {mainRoutes}
                    {settingRoutes}
                    {profileRoutes}
                    {portfolioRoutes}
                    {AdminRoutes}
                </Routes>
            </ErrorBoundary>
            <Footer />
        </>
    );
};

export default App;
