import { useState } from 'react';
import LiveTradingService from "../services/LiveTradingService";

const useLiveTrading = () => {
    const [message, setMessage] = useState(null);
    const [transactions, setTransactions] = useState(null);

    const startLiveTrading = async (portfolioType, tickerType) => {
        setMessage(null);
        try {
            const response = await LiveTradingService.startLiveTrading(portfolioType, tickerType);
            setMessage(response.data.message);
        } catch (err) {
            setMessage(err.message);
        }
    };

    const stopLiveTrading = async () => {
        setMessage(null);
        try {
            const response = await LiveTradingService.stopLiveTrading();
            setMessage(response.data.message);
        } catch (err) {
            setMessage(err.message);
        }
    };

    const getLiveTradingTransactions = async () => {
        setMessage(null);
        try {
            const response = await LiveTradingService.getLiveTradingTransactions();
            setTransactions(response.data.content);
        } catch (err) {
            setMessage(err.message);
        }
    };

    return {
        message,
        transactions,
        startLiveTrading,
        stopLiveTrading,
        getLiveTradingTransactions,
    };
};

export default useLiveTrading;
