import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authenticationService from '../../services/AuthenticationService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCustomer, setIsCustomer] = useState(true); // 使用布尔值来表示用户是否是 customer
    const navigate = useNavigate();

    useEffect(() => {
        const savedAuthState = sessionStorage.getItem('isAuthenticated');
        const savedIsCustomer = sessionStorage.getItem('isCustomer') === 'true'; // 从 sessionStorage 恢复布尔值
        if (savedAuthState) {
            setIsAuthenticated(JSON.parse(savedAuthState));
            setIsCustomer(savedIsCustomer);
        }
    }, []);

    const register = async (registrationData) => {
        const response = await authenticationService.register(registrationData);
        setIsAuthenticated(true);
        const customerRole = response.data.role === 'ROLE_CUSTOMER';
        setIsCustomer(customerRole);
        sessionStorage.setItem('isAuthenticated', true);
        sessionStorage.setItem('isCustomer', customerRole); // 保存布尔值到 sessionStorage
        return response;
    };

    const login = async (username, password) => {
        const response = await authenticationService.login(username, password);
        setIsAuthenticated(true);
        const customerRole = response.data.role === 'ROLE_CUSTOMER';
        setIsCustomer(customerRole);
        sessionStorage.setItem('isAuthenticated', true);
        sessionStorage.setItem('isCustomer', customerRole); // 保存布尔值到 sessionStorage
        return response;
    };

    const logout = () => {
        authenticationService.logout();
        setIsAuthenticated(false);
        setIsCustomer(false);
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('isCustomer');
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isCustomer, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
