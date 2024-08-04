import { useState, useEffect } from 'react';
import customerService from '../services/CustomerService';

const useCustomer = () => {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    const getCustomer = async () => {
        try {
            const response = await customerService.getCustomer();
            setCustomer(response.data);
        } catch (error) {
            console.error('Error fetching customer data', error);
        } finally {
            setLoading(false);
        }
    };

    const updateMobileNumber = async (mobileNumber) => {
        try {
            const response = await customerService.updateMobileNumber(mobileNumber);
            setCustomer((prevCustomer) => ({
                ...prevCustomer,
                mobileNumber: response.data.mobileNumber,
            }));
        } catch (error) {
            console.error('Error updating mobile number', error);
            throw error;
        }
    };

    useEffect(() => {
        getCustomer();
    }, []);

    return { customer, loading, updateMobileNumber };
};

export default useCustomer;
