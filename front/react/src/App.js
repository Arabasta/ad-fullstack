import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/elements/alerts/error/ErrorBoundary';
import authRoutes from './routes/AuthRoutes';
import mainRoutes from './routes/MainRoutes';
import profileRoutes from './routes/ProfileRoutes';
import NaviRoutes from './routes/NaviRoutes';
import Header from "./components/pageSections/headers/Header";

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
                    {NaviRoutes}
                    {authRoutes}
                    {mainRoutes}
                    {profileRoutes}
                </Routes>
            </ErrorBoundary>
        </>
    );
};

export default App;
