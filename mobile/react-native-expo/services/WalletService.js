import axiosInstance from '../config/axios/axiosInstance';

const getWallet = async () => {
    return await axiosInstance.get(`/v1/customer/wallet`);
};

const addFunds = async (amount) => {
    return await axiosInstance.post(`/v1/customer/wallet/add-funds`, { amount });
};

const withdrawFunds = async (amount) => {
    return await axiosInstance.post(`/v1/customer/wallet/withdraw-funds`, { amount });
};

const WalletService = {
    getWallet,
    addFunds,
    withdrawFunds
};

export default WalletService;