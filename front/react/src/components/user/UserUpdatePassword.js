import React, { useState } from 'react';
import UserService from '../../services/UserService';

const UpdatePassword = ({ user, updateUser }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleUpdatePassword = async () => {
        try {
            await UserService.updatePassword({ oldPassword, newPassword });
            setSuccess('Password updated successfully');
            setError('');
            setNewPassword('');
            setOldPassword('');
            if (updateUser) {
                updateUser({ ...user });
            }
        } catch (error) {
            console.error('Error updating password:', error);
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
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button onClick={handleUpdatePassword}>Update Password</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default UpdatePassword;
