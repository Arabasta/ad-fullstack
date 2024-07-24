import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            window.location.href = '/home';
        } catch (error) {
            setMessage('Invalid login pls try again');
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
