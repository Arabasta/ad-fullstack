import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import NavButtons from "../components/navigation/navBar/navLinks/NavButtons";

const NavigationBarForWeb = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <ul className="navbar-nav">
            <NavButtons to="/news" label="NEWS" />
            <NavButtons to="/profile" label="PROFILE" />
            <NavButtons to="/support" label="SUPPORT" />
            <NavButtons to="/wallet" label="WALLET" />
            <NavButtons to="/wallet/history" label="WALLET TX HISTORY" />
            <NavButtons to="/portfolio/history" label="PORTFOLIO TX HISTORY TEMPORARY" />
            {isAuthenticated ? (
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            ) : (
                <>
                    <NavButtons to="/login" label="Login" />
                    <NavButtons to="/register" label="Register" />
                </>
            )}
        </ul>
    );
};

export default NavigationBarForWeb;

