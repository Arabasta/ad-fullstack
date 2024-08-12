import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authenticationService from '../../services/AuthenticationService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCustomer, setIsCustomer] = useState(true);
    //add it to know the user's role
    const navigate = useNavigate();

    useEffect(() => {
        const savedAuthState = sessionStorage.getItem('isAuthenticated');
        const savedIsCustomer = sessionStorage.getItem('isCustomer') === 'true';
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
        sessionStorage.setItem('isCustomer', customerRole);
        return response;
    };

    const login = async (username, password) => {
        const response = await authenticationService.login(username, password);
        setIsAuthenticated(true);
        const customerRole = response.data.role === 'ROLE_CUSTOMER';
        setIsCustomer(customerRole);
        sessionStorage.setItem('isAuthenticated', true);
        sessionStorage.setItem('isCustomer', customerRole);
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
