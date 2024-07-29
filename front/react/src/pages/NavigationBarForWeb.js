import React, { useContext } from 'react';
import NavButton from '../components/common/buttons/NavButtons';
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
