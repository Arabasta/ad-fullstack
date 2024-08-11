import React, { useState } from 'react';
import UserService from '../../services/UserService';
import Header from "../common/layout/Header";
import Button from "../common/buttons/Button";

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
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
            else {
                console.error(`Error updating mobile number`, error);
                setError('An unexpected error occurred. Please try again.');
            }
        }

    };

    return (
        <div>
            <Header>Update Password</Header>
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
                <Button onClick={handleUpdatePassword}>Update Password</Button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default UpdatePassword;
