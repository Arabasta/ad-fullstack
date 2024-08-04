import axiosInstance from '../config/axios/axiosInstance';

const getPortfolio = async (portfolioType) => {
    return await axiosInstance.get(`/v1/customer/portfolio`, {
        params: { portfolioType }
    });
};

const withdrawFunds = async (portfolioType, amount) => {
    return await axiosInstance.post(`/v1/customer/portfolio/withdraw-funds`, {
        portfolioType,
        amount
    });
};

const addFunds = async (portfolioType, amount) => {
    return await axiosInstance.post(`/v1/customer/portfolio/add-funds`, {
        portfolioType,
        amount
    });
};

const PortfolioService = {
    getPortfolio,
    withdrawFunds,
    addFunds
};

export default PortfolioService;
