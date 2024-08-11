import { useState, useEffect } from 'react';
import ManageTickersService from '../services/ManageTickersService';

const useTickers = () => {
    const [activeTickers, setActiveTickers] = useState([]);
    const [availableTickers, setAvailableTickers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActiveTickers();
        fetchAvailableTickers();
    }, []);

    const fetchActiveTickers = async () => {
        setLoading(true);
        const result = await ManageTickersService.getActiveTickers();
        setActiveTickers(result.data.tickerList || []);
        setLoading(false);
    };

    const fetchAvailableTickers = async () => {
        setLoading(true);
        const result = await ManageTickersService.getAvailableTickers();
        setAvailableTickers(result.data.tickerDTOList || []);
        setLoading(false);
    };

    const addTicker = async (ticker) => {
        await ManageTickersService.addTicker(ticker);
        // No need to manually update activeTickers here as fetchActiveTickers will handle it
    };

    const deleteTicker = async (tickerId) => {
        await ManageTickersService.deleteTicker(tickerId);
        fetchActiveTickers();  // Refresh the list of active tickers after deleting one
    };

    return {
        activeTickers,
        availableTickers,
        loading,
        addTicker,
        deleteTicker,
        fetchActiveTickers  // Expose fetchActiveTickers to trigger a manual refresh
    };
};

export default useTickers;
