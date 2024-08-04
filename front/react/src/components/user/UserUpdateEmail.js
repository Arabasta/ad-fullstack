import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';

const UpdateEmail = ({ user, updateUser }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user && user.email) {
            setEmail(user.email);
        }
    }, [user]);

    const handleUpdateEmail = async () => {
        try {
            await UserService.updateEmail({ email });
            setSuccess('Email updated successfully');
            setError('');

            if (updateUser) {
                updateUser({ ...user, email });
            }
        } catch (error) {
            console.error('Error updating email', error);
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default UpdateEmail;
