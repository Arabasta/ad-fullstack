import React from 'react';
import { BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/common/error/ErrorBoundary';
import authRoutes from './routes/AuthRoutes';
import mainRoutes from './routes/MainRoutes';
import NavigationBarForWeb from './pages/NavigationBarForWeb';
import settingsRoutes from './routes/SettingsRoutes';
import NaviRoutes from './routes/NaviRoutes';
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <ChakraProvider>
                    <AppContent />
                </ChakraProvider>
            </AuthProvider>
        </Router>
    );
};

const AppContent = () => {
    const location = useLocation();

    //these routes not need navi bar
    const noNavRoutes = ['/login', '/register', '/forgot-password'];

    return (
        <>
            {!noNavRoutes.includes(location.pathname) && <NavigationBarForWeb />}
            <ErrorBoundary>
                <Routes>
                    {NaviRoutes}
                    {authRoutes}
                    {mainRoutes}
                    {settingsRoutes}
                </Routes>
            </ErrorBoundary>
        </>
    );
};

export default App;
