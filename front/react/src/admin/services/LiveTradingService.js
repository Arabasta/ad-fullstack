import axiosInstance from "../../config/axios/axiosInstance";

const startTrade = async () => {
    return await axiosInstance.get(`/v1/admin/trading/livetrading/start`);
};

const stopTrade = async () => {
    return await axiosInstance.get(`/v1/admin/trading/livetrading/stop`);
};

const seeTransactions = async () => {
    return await axiosInstance.get(`/v1/admin/trading/livetrading/transactions`);
};

const LiveTradingService = {
    startTrade,
    stopTrade,
    seeTransactions,
};

export default LiveTradingService;
