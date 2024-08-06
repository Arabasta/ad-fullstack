import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authenticationService from '../../services/AuthenticationService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedAuthState = localStorage.getItem('isAuthenticated');
        if (savedAuthState) {
            setIsAuthenticated(JSON.parse(savedAuthState));
        }
    }, []);

    const register = async (registrationData) => {
        const response = await authenticationService.register(registrationData);
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', true);
        return response;
    };

    const login = async (username, password) => {
        const response = await authenticationService.login(username, password);
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', true);
        return response;
    };

    const logout = () => {
        authenticationService.logout();
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
