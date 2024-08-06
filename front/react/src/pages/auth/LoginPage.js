import React, { useState } from 'react';
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import LoginForm from "../../components/customer/auth/LoginForm";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            // todo: later change to dashboard
            navigate('/');
        } catch (error) {
            setMessage('Invalid login please try again');
        }
    };

    // todo: failure or success alert
    return (
        <LoginForm username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              method={handleLogin}
              message={message}/>
    );
};

export default LoginPage;