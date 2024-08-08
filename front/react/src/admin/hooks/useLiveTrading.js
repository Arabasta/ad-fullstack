import { useState, useCallback } from 'react';
import LiveTradingService from "../services/LiveTradingService";

const useLiveTrading = () => {
    const [message, setMessage] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    const startLiveTrading = useCallback(async (portfolioType, tickerType) => {
        setMessage(null);
        try {
            const response = await LiveTradingService.startLiveTrading(portfolioType, tickerType);
            setMessage(response.data.message);
        } catch (err) {
            setMessage(err.message);
        }
    }, []);

    const stopLiveTrading = useCallback(async () => {
        setMessage(null);
        try {
            const response = await LiveTradingService.stopLiveTrading();
            setMessage(response.data.message);
        } catch (err) {
            setMessage(err.message);
        }
    }, []);

    const getLiveTradingTransactions = useCallback(async (portfolioType) => {
        setLoading(true);
        try {
            const response = await LiveTradingService.getLiveTradingTransactions(portfolioType);
            setTransactions(response.data.data.content);
            setHasMore(response.data.data.content.length > 0);
        } catch (err) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        message,
        transactions,
        loading,
        hasMore,
        startLiveTrading,
        stopLiveTrading,
        getLiveTradingTransactions,
    };
};

export default useLiveTrading;
