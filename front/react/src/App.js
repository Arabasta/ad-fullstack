import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider, AuthContext } from './config/context/AuthContext';
import ErrorBoundary from './components/common/alerts/ErrorBoundary';
import authRoutes from './routes/AuthRoutes';
import mainRoutes from './routes/MainRoutes';
import profileRoutes from './routes/ProfileRoutes';
import portfolioRoutes from './routes/PortfolioRoutes';
import Header from "./components/common/layout/Header";
import Footer from "./components/common/layout/Footer";
import settingRoutes from "./routes/SettingRoutes";
import AdminHeader from "./admin/component/Header/adminHeader";
import customerUnProtectedRoutes from "./routes/CustomerUnProtectedRoute";
import adminRoutes from "./admin/Routes/adminRoutes";
import adminUnprotectedRoute from "./admin/Routes/adminUnprotectedRoute";

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
    const { isCustomer, isAuthenticated } = useContext(AuthContext);

    return (
        <>
            {!isCustomer ? (
                <AdminHeader />
            ) : (
                <Header />
            )}

            <ErrorBoundary>
                <Routes>
                    {authRoutes}
                    {!isCustomer ? (
                        <>
                            {adminUnprotectedRoute}
                            {isAuthenticated && adminRoutes}

                        </>
                    ) : (
                        <>
                            {customerUnProtectedRoutes}
                            {/* only login can access the route */}
                            {isAuthenticated && settingRoutes}
                            {isAuthenticated && profileRoutes}
                            {isAuthenticated && portfolioRoutes}
                            {isAuthenticated && mainRoutes}
                        </>
                    )}
                </Routes>
            </ErrorBoundary>
            <Footer />
        </>
    );
};

export default App;
