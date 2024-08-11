import { useState, useCallback } from 'react';
import LiveTradingService from "../services/LiveTradingService";

const useLiveTrading = () => {
    const [message, setMessage] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [isTrading, setIsTrading] = useState(false);
    const [algorithmTypes, setAlgorithmTypes] = useState([]);

    const startLiveTrading = useCallback(async (algorithmType) => {
        if (isTrading) {
            setMessage("Live trading is already running.");
            return;
        }

        setMessage(null);
        setIsTrading(true);
        try {
            const response = await LiveTradingService.startLiveTrading(algorithmType);
            setMessage(response.data.message);
        } catch (err) {
            setMessage(err.message);
            setIsTrading(false);
        }
    }, [isTrading]);

    const stopLiveTrading = useCallback(async () => {
        if (!isTrading) {
            setMessage("No live trading is currently running.");
            return;
        }

        setMessage(null);
        try {
            const response = await LiveTradingService.stopLiveTrading();
            setMessage(response.data.message);
            setIsTrading(false);
        } catch (err) {
            setMessage(err.message);
        }
    }, [isTrading]);


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

    const getAlgorithmTypes = useCallback(async () => {
        try {
            const response = await LiveTradingService.getAlgorithmTypes();
            setAlgorithmTypes(response.data.data.algorithms);
        } catch (err) {
            setMessage(err.message);
        }
    }, []);

    return {
        message,
        transactions,
        loading,
        hasMore,
        isTrading,
        startLiveTrading,
        stopLiveTrading,
        getLiveTradingTransactions,
        algorithmTypes,
        getAlgorithmTypes,
    };
};

export default useLiveTrading;
