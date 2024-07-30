import React, { useState } from 'react';
import UserService from '../../services/UserService';

const UpdateEmail = ({ user }) => {
    const [email, setEmail] = useState(user?.email || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleUpdateEmail = async () => {
        try {
            await UserService.updateEmail(user.username, { email });
            setSuccess('Email updated successfully');
            setError('');
        } catch (error) {
            setError('Error updating email');
            setSuccess('');
        }
    };

    return (
        <div>
            <h1>Update Email</h1>
            <div>
                <input
                    type="email"
                    placeholder="New Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleUpdateEmail}>Update Email</button>
            </div>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </div>
    );
};

export default UpdateEmail;
