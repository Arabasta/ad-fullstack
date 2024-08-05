import axiosInstance from "../../config/axios/axiosInstance";

const getAlgorithmList = async () => {
    return await axiosInstance.get('/v1/admin/trading/backtest/view');
};

const runBackTest = async (ticker, portfolioType) => {
    return await axiosInstance.get(`/v1/admin/trading/backtest/${ticker}?portfolioType=${portfolioType}`);
};

const BackTestService = {
    getAlgorithmList,
    runBackTest
};

export default BackTestService;
