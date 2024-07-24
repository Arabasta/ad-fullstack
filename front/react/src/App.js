import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/common/error/ErrorBoundary';
import authRoutes from './routes/AuthRoutes';
import mainRoutes from './routes/MainRoutes';
import NavigationBarForWeb from './components/layout/NavigationBarForWeb';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <NavigationBarForWeb />
                <ErrorBoundary>
                    <Routes>
                        {authRoutes}
                        {mainRoutes}
                    </Routes>
                </ErrorBoundary>
            </Router>
        </AuthProvider>
    );
};

export default App;
