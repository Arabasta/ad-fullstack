import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider, AuthContext } from './config/context/AuthContext';
import ErrorBoundary from './components/common/alerts/ErrorBoundary';
import authRoutes from './routes/AuthRoutes';
import mainRoutes from './routes/MainRoutes';
import profileRoutes from './routes/ProfileRoutes';
import NavigationBarRoutes from "./archive/navbar/NavigationBarRoutes";
import portfolioRoutes from './routes/PortfolioRoutes';
import Header from "./components/common/layout/Header";
import Footer from "./components/common/layout/Footer";
import AdminRoutes from "./admin/Routes/adminRoutes";
import settingRoutes from "./routes/SettingRoutes";

import { Button, useColorMode } from "@chakra-ui/react";
import AdminHeader from "./admin/component/Header/adminHeader";

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
    const { colorMode, toggleColorMode } = useColorMode();
    const { isCustomer } = useContext(AuthContext);

    return (
        <>
            {!isCustomer ? (
                <>
                    <AdminHeader />
                    <Button onClick={toggleColorMode}>
                        Toggle {colorMode === "light" ? "Dark" : "Light"}
                    </Button>
                </>
            ) : (
                <>
                    <Header />
                    <Button onClick={toggleColorMode}>
                        Toggle {colorMode === "light" ? "Dark" : "Light"}
                    </Button>
                </>
            )}

            <ErrorBoundary>
                <Routes>
                    {authRoutes}
                    {!isCustomer ? (
                        <>
                            {AdminRoutes}
                        </>
                    ) : (
                        <>
                            {NavigationBarRoutes}
                            {mainRoutes}
                            {settingRoutes}
                            {profileRoutes}
                            {portfolioRoutes}
                        </>
                    )}
                </Routes>
            </ErrorBoundary>
            <Footer />
        </>
    );
};

export default App;

