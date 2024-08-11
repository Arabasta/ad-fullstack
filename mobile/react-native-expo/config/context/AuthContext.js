import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authenticationService from '../../services/AuthenticationService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const loadAuthState = async () => {
            const savedAuthState = await AsyncStorage.getItem('isAuthenticated');
            if (savedAuthState) {
                setIsAuthenticated(JSON.parse(savedAuthState));
            }
        };

        loadAuthState();
    }, []);

    const register = async (registrationData) => {
        const response = await authenticationService.register(registrationData);
        setIsAuthenticated(true);
        await AsyncStorage.setItem('isAuthenticated', JSON.stringify(true));
        return response;
    };

    const login = async (username, password) => {
        const response = await authenticationService.login(username, password);
        setIsAuthenticated(true);
        await AsyncStorage.setItem('isAuthenticated', JSON.stringify(true));
        return response;
    };

    const logout = async () => {
        await authenticationService.logout();
        setIsAuthenticated(false);
        await AsyncStorage.removeItem('isAuthenticated');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
