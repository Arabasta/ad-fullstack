import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './config/context/AuthContext';
import ErrorBoundary from './components/elements/alerts/error/ErrorBoundary';
import authRoutes from './routes/AuthRoutes';
import mainRoutes from './routes/MainRoutes';
import profileRoutes from './routes/ProfileRoutes';
import portfolioRoutes from './routes/PortfolioRoutes';
import Header from "./components/pageSections/headers/Header";
import Footer from "./components/pageSections/footers/Footer";
import NavigationBarRoutes from "./navbar/NavigationBarRoutes";


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
                    {profileRoutes}
                    {portfolioRoutes}
                </Routes>
            </ErrorBoundary>
            <Footer />
        </>
    );
};

export default App;
