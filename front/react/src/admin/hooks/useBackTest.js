import { useState, useEffect, useCallback } from 'react';
import BackTestService from '../services/BackTestService';

const useBackTest = () => {
    const [algorithms, setAlgorithms] = useState([]);
    const [portfolioTypes, setPortfolioTypes] = useState([]);
    const [tickerList, setTickerList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAlgorithmList = useCallback(async () => {
        try {
            setLoading(true);
            const response = await BackTestService.getAlgorithmList();
            const data = response.data.data;
            setAlgorithms(data.algorithms);
            setPortfolioTypes(data.portfolioTypes);
            setTickerList(data.tickerList);
        } catch (err) {
            console.error('Error fetching algorithm list', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getAlgorithmList();
    }, [getAlgorithmList]);

    return {
        algorithms,
        portfolioTypes,
        tickerList,
        loading,
        error,
    };
};

export default useBackTest;
