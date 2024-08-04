import axiosInstance from '../config/axios/axiosInstance';

const getCustomer = async () => {
    try {
        const response = await axiosInstance.get('/v1/customer/details');
        return response.data;
    } catch (error) {
        console.error('Error fetching customer data', error);
        throw error;
    }
};

const updateMobileNumber = async (mobileNumber) => {
    try {
        const response = await axiosInstance.post('/v1/customer/update-mobile-number', { mobileNumber });
        return response.data;
    } catch (error) {
        console.error('Error updating mobile number', error);
        throw error;
    }
};

const customerService = {
    getCustomer,
    updateMobileNumber
};

export default customerService;
