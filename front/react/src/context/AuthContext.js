import React, {createContext, useEffect, useState} from 'react';
import authenticationService from '../services/auth/AuthenticationService';

// used to store auth state and methods across component tree
// context object can be accessed by calling useContext(AuthContext)
export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const register = async (registrationData) => {
        return authenticationService.register(registrationData);
    };

    const login = async (username, password) => {
        return authenticationService.login(username, password);
    };

    const logout = () => {
        authenticationService.logout();
    };

    return (
        <AuthContext.Provider value={{ register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
