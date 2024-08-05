import { useState, useEffect, useCallback } from 'react';
import LiveTradingService from '../services/LiveTradingService';

const useLiveTrading = (portfolioType = '', tickerType = '') => {
    const [portfolioType, setPortfolioType] = useState(portfolioType);
    const [tickerType, setTickerType] = useState(tickerType);
    const [transactions, setTransactions] = useState([]);

    const startTrade = useCallback(async () => {
        try {
            const response = await LiveTradingService.startTrade(portfolioType, tickerType);
            return response.data.data;
        } catch (error) {
            console.error('Error starting trade', error);
        }
    }, [portfolioType, tickerType]);

    const stopTrade = useCallback(async () => {
        try {
            const response = await LiveTradingService.stopTrade();
            return response.data.data;
        } catch (error) {
            console.error('Error stopping trade', error);
        }
    }, []);

    const seeTransactions = useCallback(async (page = 0, size = 10) => {
        try {
            const response = await LiveTradingService.seeTransactions(portfolioType, page, size);
            setTransactions(response.data.data);
        } catch (error) {
            console.error('Error fetching transactions', error);
        }
    }, [portfolioType]);

    // Render transactions given portfolioType
    useEffect(() => {
        if (portfolioType) {
            seeTransactions();
        }
    }, [portfolioType, seeTransactions]);

    return { transactions, startTrade, stopTrade, seeTransactions, setPortfolioType, setTickerType };
};

export default useLiveTrading;
