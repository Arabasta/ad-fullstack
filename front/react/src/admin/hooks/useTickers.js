import { useState, useEffect } from 'react';
import ManageTickersService from '../services/ManageTickersService';

const useTickers = () => {
    const [activeTickers, setActiveTickers] = useState([]);
    const [availableTickers, setAvailableTickers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActiveTickers();
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
        fetchActiveTickers();
    };

    const deleteTicker = async (tickerId) => {
        await ManageTickersService.deleteTicker(tickerId);
        fetchActiveTickers();
    };

    return {
        activeTickers,
        availableTickers,
        loading,
        fetchAvailableTickers,
        addTicker,
        deleteTicker
    };
};

export default useTickers;
