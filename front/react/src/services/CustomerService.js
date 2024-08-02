import axiosInstance from '../config/axios/axiosInstance';

const getCustomerDetails = async () => {
    try {
        const response = await axiosInstance.get('/v1/customer/details');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching Customer details', error);
        throw error;
    }
};

const updateMobileNumber = async (mobileNumberDTO) => {
    try {
        const response = await axiosInstance.put(`/v1/customer/update-mobile-number`, mobileNumberDTO);
        return response.data;
    } catch (error) {
        console.error('Error updating Mobile Number', error);
        throw error;
    }
};

const CustomerService = {
    getCustomerDetails,
    updateMobileNumber,
};

export default CustomerService;
