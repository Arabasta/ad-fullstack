import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/auth/AuthService';

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

    const login = async (username, password) => {
        const response = await authService.login(username, password);
        setUser(response);
        localStorage.setItem('user', JSON.stringify(response));
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
