import axiosInstance from '../config/axios/axiosInstance';

const getWalletTransactions = async (page, size) => {
    return await axiosInstance.get(`/v1/customer/log/sql/wallet`, {
        params: { page, size },
    });
};

const getPortfolioTransactions = async (portfolioType, page, size) => {
    return await axiosInstance.get(`/v1/customer/log/sql/portfolio`, {
        params: { portfolioType, page, size },
    });
};

const SqlTransactionLogService = {
    getWalletTransactions,
    getPortfolioTransactions,
};

export default SqlTransactionLogService;