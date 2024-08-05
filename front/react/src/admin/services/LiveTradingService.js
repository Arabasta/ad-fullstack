import axiosInstance from "../../config/axios/axiosInstance";

const startTrade = async (portfolioType = '', tickerType='') => {
    const url = `/v1/admin/trading/livetrading/start?portfolioType=${portfolioType}&tickerType=${tickerType}`
    return await axiosInstance.get(url);
};

const stopTrade = async () => {
    return await axiosInstance.get(`/v1/admin/trading/livetrading/stop`);
};

const seeTransactions = async (portfolioType = '', page = 0, size= 10 ) => {
    const url = `/api/v1/admin/trading/livetrading/transactions?portfolioType=${portfolioType}&page=${page}&size=${size}`;
    return await axiosInstance.get(url);
};

const LiveTradingService = {
    startTrade,
    stopTrade,
    seeTransactions,
};

export default LiveTradingService;
