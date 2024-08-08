import React, { useState, useEffect } from 'react';
import useCustomer from '../../hooks/useCustomer';

const UpdateMobileNumber = () => {
    const { customer: user, updateMobileNumber, loading } = useCustomer();
    const [mobileNumber, setMobileNumber] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user && user.mobileNumber) {
            setMobileNumber(user.mobileNumber);
        }
    }, [user]);

    const handleUpdateMobileNumber = async () => {
        try {
            await updateMobileNumber(mobileNumber);
            setSuccess('Mobile number updated successfully');
            setError('');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                console.error(`Error updating mobile number`, error);
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    const handleMobileNumberChange = (e) => {
        setMobileNumber(e.target.value);
    };

    if (loading) {
        return <p>Loading user data...</p>;
    }

    return (
        <div>
            <h1>Update Mobile Number</h1>
            <div>
                <input
                    type="tel"
                    placeholder="New Mobile Number"
                    value={mobileNumber}
                    onChange={handleMobileNumberChange}
                    pattern="\d*"
                />
                <button onClick={handleUpdateMobileNumber}>Update Mobile Number</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default UpdateMobileNumber;
