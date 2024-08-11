import axiosInstance from "../../config/axios/axiosInstance";

const getAlgorithmList = async () => {
    return await axiosInstance.get('/v1/admin/trading/backtest/view');
};

const runBackTest = async (portfolioType, amount, algorithmType, ticker) => {
    let url = `/v1/admin/trading/backtest/${portfolioType}?amount=${amount}`;

    if (ticker) {
        url += `&ticker=${ticker}`;
    }

    url += `&algorithmType=${algorithmType}`;

    return await axiosInstance.get(url);
};

const BackTestService = {
    getAlgorithmList,
    runBackTest
};

export default BackTestService;

