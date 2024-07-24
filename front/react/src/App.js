import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/common/error/ErrorBoundary';
import authRoutes from './routes/AuthRoutes';
import mainRoutes from './routes/MainRoutes';

const App = () => {
    return (
        <AuthProvider>
            <Router>
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
