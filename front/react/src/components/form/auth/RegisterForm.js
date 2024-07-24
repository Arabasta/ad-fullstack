import React, { useState } from 'react';
import useAuth from "../../../hooks/useAuth";

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { register } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(username, password);
            setMessage('User registered successfully');
        } catch (error) {
            setMessage('Registration failed');
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Register</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default RegisterForm;
