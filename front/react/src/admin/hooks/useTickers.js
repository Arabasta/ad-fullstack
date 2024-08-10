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
        setActiveTickers((prevActiveTickers) => [...prevActiveTickers, ticker]);
        setAvailableTickers((prevAvailableTickers) =>
            prevAvailableTickers.filter(t => t.id !== ticker.id)
        );
    };

    const deleteTicker = async (tickerId) => {
        await ManageTickersService.deleteTicker(tickerId);
        const ticker = activeTickers.find(t => t.id === tickerId);
        setAvailableTickers((prevAvailableTickers) => [...prevAvailableTickers, ticker]);
        setActiveTickers((prevActiveTickers) => prevActiveTickers.filter(t => t.id !== tickerId));
    };

    return {
        activeTickers,
        availableTickers,
        loading,
        addTicker,
        deleteTicker
    };
};

export default useTickers;
