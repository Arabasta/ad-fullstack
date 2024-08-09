import axiosInstance from "../../config/axios/axiosInstance";

const getAlgorithmList = async () => {
    return await axiosInstance.get('/v1/admin/trading/backtest/view');
};

const runBackTest = async (ticker, portfolioType) => {
    const url = `/v1/admin/trading/backtest/${portfolioType}`;
    const params = ticker ? `?ticker=${ticker}` : '';
    return await axiosInstance.get(`${url}${params}`);
};

const BackTestService = {
    getAlgorithmList,
    runBackTest
};

export default BackTestService;
