import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authenticationService from '../services/auth/AuthenticationService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const register = async (registrationData) => {
        const response = await authenticationService.register(registrationData);
        setIsAuthenticated(true);
        return response;
    };

    const login = async (username, password) => {
        const response = await authenticationService.login(username, password);
        setIsAuthenticated(true);
        return response;
    };

    const logout = () => {
        authenticationService.logout();
        setIsAuthenticated(false);
        navigate('/');  // 登出后跳转到首页
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
