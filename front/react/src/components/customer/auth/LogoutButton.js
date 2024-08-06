import React from 'react';
import {useNavigate} from "react-router-dom";
import authenticationService from '../../../services/AuthenticationService';
import useAuth from "../../../hooks/useAuth";

const LogoutComponent = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        authenticationService.logout();
        setUser(null);
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutComponent;
