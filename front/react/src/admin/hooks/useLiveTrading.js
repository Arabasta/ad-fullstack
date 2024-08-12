import { useState, useCallback } from 'react';
import LiveTradingService from "../services/LiveTradingService";

const useLiveTrading = () => {
    const [message, setMessage] = useState(null);
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

    const getAlgorithmTypes = useCallback(async () => {
        try {
            const response = await LiveTradingService.getAlgorithmTypes();
            setAlgorithmTypes(response.data.data.algorithms);
        } catch (err) {
            setMessage(err.message);
        }
    }, []);

    const getStatus = useCallback(async () => {
        try {
            const response = await LiveTradingService.getLiveTradingStatus();
            setIsTrading(response.data.data.status);
        } catch (err) {
            setMessage(err.message);
        }
    }, []);

    return {
        message,
        isTrading,
        startLiveTrading,
        stopLiveTrading,
        algorithmTypes,
        getAlgorithmTypes,
        getStatus
    };
};

export default useLiveTrading;
