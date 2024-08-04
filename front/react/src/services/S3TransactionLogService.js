import axiosInstance from '../config/axios/axiosInstance';

const getWalletTransactions = async (page, size) => {
    return await axiosInstance.get(`/v1/customer/log/s3/wallet`, {
        params: { page, size },
    });
};

const getPortfolioTransactions = async (portfolioType, page, size) => {
    return await axiosInstance.get(`/v1/customer/log/portfolio`, {
        params: { portfolioType, page, size },
    });
};

const S3TransactionLogService = {
    getWalletTransactions,
    getPortfolioTransactions,
};

export default S3TransactionLogService;
