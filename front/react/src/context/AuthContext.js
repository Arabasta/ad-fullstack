import React, { createContext, useState, useEffect } from 'react';
import authenticationService from '../services/auth/AuthenticationService';

// used to store auth state and methods across component tree
export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // check for stored user in local storage
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    const register = async (username, password, email) => {
        const response = await authenticationService.register(username, password, email);
        setUser(response);
        localStorage.setItem('user', JSON.stringify(response));
    };

    const login = async (username, password) => {
        const response = await authenticationService.login(username, password);
        setUser(response);
        localStorage.setItem('user', JSON.stringify(response));
    };

    const logout = () => {
        authenticationService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
