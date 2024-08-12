import axiosInstance from "../../config/axios/axiosInstance";

//get algo type
const getAlgorithmTypes = async () => {
    const url = '/v1/admin/trading/livetrading/view';
    return await axiosInstance.get(url);
};

// Start live trading
const startLiveTrading = async (algorithmType) => {
    const url = `/v1/admin/trading/livetrading/start?algorithmType=${algorithmType}`;
    return await axiosInstance.get(url);
};

// Stop live trading
const stopLiveTrading = async () => {
    const url = '/v1/admin/trading/livetrading/stop';
    return await axiosInstance.get(url);
};

// Get live trading transactions
const getLiveTradingTransactions = async () => {
    const url = `/v1/admin/trading/livetrading/transactions`;
    return await axiosInstance.get(url);
};

// Get live trading status
const getLiveTradingStatus = async () => {
    const url = `/v1/admin/trading/livetrading/status`;
    return await axiosInstance.get(url);
};

const LiveTradingService = {
    startLiveTrading,
    stopLiveTrading,
    getLiveTradingTransactions,
    getAlgorithmTypes,
    getLiveTradingStatus
};

export default LiveTradingService;
