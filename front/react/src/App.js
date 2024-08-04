import React from 'react';
import { BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './config/context/AuthContext';
import ErrorBoundary from './components/elements/alerts/error/ErrorBoundary';
import authRoutes from './routes/AuthRoutes';
import mainRoutes from './routes/MainRoutes';
import NavigationBar from './navbar/NavigationBar';
import profileRoutes from './routes/ProfileRoutes';
import navigationBarRoutesRoutes from './navbar/NavigationBarRoutes';

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
    const location = useLocation();

    //these routes not need navi bar
    const noNavRoutes = ['/login', '/register', '/forgot-password'];

    return (
        <>
            {!noNavRoutes.includes(location.pathname) && <NavigationBar />}
            <ErrorBoundary>
                <Routes>
                    {navigationBarRoutesRoutes}
                    {authRoutes}
                    {mainRoutes}
                    {profileRoutes}
                </Routes>
            </ErrorBoundary>
        </>
    );
};

export default App;
