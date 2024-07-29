import React, { createContext, useState, useEffect } from 'react';
import authenticationService from '../services/auth/AuthenticationService';

// used to store auth state and methods across component tree
// context object can be accessed by calling useContext(AuthContext)
export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const register = async (registrationData) => {
        return authenticationService.register(registrationData);
    };

    const login = async (username, password) => {
        await authenticationService.login(username, password);
        setIsAuthenticated(true);
    };

    const logout = () => {
        authenticationService.logout();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
