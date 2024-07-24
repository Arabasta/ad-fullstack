import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/common/error/ErrorBoundary';
import authRoutes from './routes/AuthRoutes';
import mainRoutes from './routes/MainRoutes';
import NavigationBarForWeb from './pages/NavigationBarForWeb';
import settingsRoutes from "./routes/SettingsRoutes";
import NaviRoutes from "./routes/NaviRoutes";


const App = () => {
    return (
        <AuthProvider>
            <Router>
                <NavigationBarForWeb />
                <ErrorBoundary>
                    <Routes>
                        {NaviRoutes}
                        {authRoutes}
                        {mainRoutes}
                        {settingsRoutes}
                    </Routes>
                </ErrorBoundary>
            </Router>
        </AuthProvider>
    );
};

export default App;
