import React, { useEffect, useState } from 'react';
import CustomerService from "../../services/CustomerService";

const CustomerName = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const data = await CustomerService.getCustomerDetails();
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setLoading(false);
            } catch (error) {
                setError('Error fetching customer details');
                setLoading(false);
            }
        };

        fetchCustomerDetails();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <p>Hi {firstName} {lastName}</p>
        </div>
    );
};

export default CustomerName;
