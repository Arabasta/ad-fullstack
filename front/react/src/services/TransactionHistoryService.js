import axiosInstance from '../config/axios/axiosInstance';

const getWalletTransactions = async (page, size) => {
    return await axiosInstance.get(`/v1/transaction/wallet`, {
        params: { page, size },
    });
};

const getPortfolioTransactions = async (portfolioType, page, size) => {
    return await axiosInstance.get(`/v1/transaction/portfolio`, {
        params: { portfolioType, page, size },
    });
};

const TransactionHistoryService = {
    getWalletTransactions,
    getPortfolioTransactions,
};

export default TransactionHistoryService;
