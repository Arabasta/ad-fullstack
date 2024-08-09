import axiosInstance from "../../config/axios/axiosInstance";

// Start live trading
const startLiveTrading = async (portfolioType, tickerType) => {
    const url = `/v1/admin/trading/livetrading/start?portfolioType=${portfolioType}&tickerType=${tickerType}`;
    return await axiosInstance.get(url);
};

// Stop live trading
const stopLiveTrading = async () => {
    const url = '/v1/admin/trading/livetrading/stop';
    return await axiosInstance.get(url);
};

// Get live trading transactions
const getLiveTradingTransactions = async (portfolioType) => {
    const url = `/v1/admin/trading/livetrading/transactions?portfolioType=${portfolioType}`;
    return await axiosInstance.get(url);
};

const LiveTradingService = {
    startLiveTrading,
    stopLiveTrading,
    getLiveTradingTransactions,
};

export default LiveTradingService;
