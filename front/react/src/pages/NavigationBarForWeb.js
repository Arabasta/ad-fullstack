import React, { useContext } from 'react';
import NavButton from "../components/navigation/navBar/navLinks/NavButtons";
import { AuthContext } from '../context/AuthContext';

const NavigationBarForWeb = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <ul className="navbar-nav">
            <NavButton to="/news" label="NEWS" />
            <NavButton to="/settings" label="SETTINGS" />
            <NavButton to="/support" label="SUPPORT" />
            <NavButton to="/wallet" label="WALLET" />
            <NavButton to="/wallet/history" label="WALLET TX HISTORY" />
            <NavButton to="/portfolio/history" label="PORTFOLIO TX HISTORY TEMPORARY" />
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

export default NavigationBarForWeb;
