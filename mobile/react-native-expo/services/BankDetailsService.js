import axiosInstance from '../config/axios/axiosInstance';

const getBankDetails = async () => {
    return await axiosInstance.get(`/v1/customer/bank-details`);
};

const updateBankDetails = async (updateBankDetailsDTO) => {
    return await axiosInstance.post(`/v1/customer/bank-details/update`, updateBankDetailsDTO);
};

const BankDetailsService = {
    getBankDetails,
    updateBankDetails,
};

export default BankDetailsService;