import axiosInstance from '../config/axios/axiosInstance';

const getFinancialProfile = async () => {
    return await axiosInstance.get('/v1/customer/financial-profile');
};

const updateFinancialProfile = async (profileData) => {
    return await axiosInstance.put('/v1/customer/financial-profile/update', profileData);
};

const FinancialProfileService = {
    getFinancialProfile,
    updateFinancialProfile
};

export default FinancialProfileService;

