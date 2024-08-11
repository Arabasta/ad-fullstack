import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import Header from "../common/layout/Header";
import Button from "../common/buttons/Button";

const UpdateEmail = ({ user, updateUser }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user && user.email) {
            setEmail(user.email);
        }
    }, [user]);

    const handleUpdateEmail2 = async () => {
        try {
            await UserService.updateEmail({ email });
            setSuccess('Email updated successfully');
            setError('');

            if (updateUser) {
                updateUser({ ...user, email });
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                console.error(`Error updating email`, error);
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div>
            <Header>Update Email</Header>
            <div>
                <input
                    type="email"
                    placeholder="New Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={handleUpdateEmail2}>Update Email</Button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default UpdateEmail;
