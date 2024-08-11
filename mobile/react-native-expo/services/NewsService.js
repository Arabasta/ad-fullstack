import axiosInstance from '../config/axios/axiosInstance';

const getInvestorProfile = async () => {
    return await axiosInstance.get(`/v1/customer/investment-profile`);
};

const updateInvestorProfile = async (profileData) => {
    return await axiosInstance.post(`/v1/customer/investment-profile/update`, profileData);
};

const InvestorProfileService = {
    getInvestorProfile,
    updateInvestorProfile
};

export default InvestorProfileService;