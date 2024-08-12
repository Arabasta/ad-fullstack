/*import React, { createContext, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import authenticationService from '../../services/AuthenticationService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCustomer, setIsCustomer] = useState(true);
    //add it to know the user's role
    const navigate = useNavigate();



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

*/

import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authenticationService from '../../services/AuthenticationService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null); // State to track the user's role
    const navigate = useNavigate();

    const register = async (registrationData) => {
        const response = await authenticationService.register(registrationData);
        setIsAuthenticated(true);
        setRole(response.data.role); // Set the role state
        sessionStorage.setItem('isAuthenticated', true);
        sessionStorage.setItem('role', response.data.role); // Store role in session
        return response;
    };

    const login = async (username, password, expectedRole) => {
        const response = await authenticationService.login(username, password);
        const actualRole = response.data.role;

        if (actualRole === expectedRole) {
            setIsAuthenticated(true);
            setRole(actualRole); // Set the role state
            sessionStorage.setItem('isAuthenticated', true);
            sessionStorage.setItem('role', actualRole); // Store role in session
        } else {
            setIsAuthenticated(false);
            setRole(null); // Reset role state
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem('role'); // Remove role from session
            throw new Error('Role mismatch'); // Throw an error if the roles do not match
        }

        return response;
    };

    const logout = () => {
        authenticationService.logout();
        setIsAuthenticated(false);
        setRole(null); // Reset role state
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('role'); // Remove role from session
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
