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
            setAlgorithms(data.algorithms || []);  // 设置算法列表
            setPortfolioTypes(data.portfolioTypes || []);  // 设置投资组合类型
            setTickerList(data.tickerList || []);  // 设置股票代码列表
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
