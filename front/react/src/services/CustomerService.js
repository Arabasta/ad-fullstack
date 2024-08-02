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

const customerService = {
    getCustomer
};

export default customerService;
