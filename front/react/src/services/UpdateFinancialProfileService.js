import axiosInstance from '../config/axios/axiosInstance';

const getFinancialProfile = async () => {
    try {
        const response = await axiosInstance.get(`/v1/customer/financial-profile`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching financial profile', error);
        throw error;
    }
};

const updateFinancialProfile = async (financialProfile) => {
    try {
        const response = await axiosInstance.put(`/v1/customer/financial-profile/update`, financialProfile);
        return response.data;
    } catch (error) {
        console.error('Error updating financial profile', error);
        throw error;
    }
};

const UpdateFinancialProfileService = {
    getFinancialProfile,
    updateFinancialProfile
};

export default UpdateFinancialProfileService;
