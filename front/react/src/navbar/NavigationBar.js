import React, { useContext } from 'react';
import NavButton from "./components/NavButtons";
import { AuthContext } from '../config/context/AuthContext';

const NavigationBar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <ul className="navbar-nav">
            <NavButton to="/news" label="NEWS" />
            <NavButton to="/profile" label="PROFILE" />
            <NavButton to="/support" label="SUPPORT" />
            <NavButton to="/wallet" label="WALLET" />
            <NavButton to="/customer/details" label="Customer Details"/>
            {isAuthenticated ? (
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            ) : (
                <>
                    <NavButton to="/login" label="Login" />
                    <NavButton to="/register" label="Register" />
                </>
            )}
        </ul>
    );
};

export default NavigationBar;
