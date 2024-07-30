import React, { useState } from 'react';
import UserService from '../../services/UserService';

const UpdatePassword = ({ user }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleUpdatePassword = async () => {
        try {
            await UserService.updatePassword(user.username, { password });
            setSuccess('Password updated successfully');
            setError('');
        } catch (error) {
            setError('Error updating password');
            setSuccess('');
        }
    };

    return (
        <div>
            <h1>Update Password</h1>
            <div>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleUpdatePassword}>Update Password</button>
            </div>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </div>
    );
};

export default UpdatePassword;
