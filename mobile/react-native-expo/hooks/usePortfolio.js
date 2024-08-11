import { useState, useEffect } from 'react';
import PortfolioService from '../services/PortfolioService';

const usePortfolio = (portfolioType) => {
    const [portfolio, setPortfolio] = useState({});

    const getPortfolio = async () => {
        try {
            const response = await PortfolioService.getPortfolio(portfolioType);
            setPortfolio(response.data.data);
        } catch (error) {
            console.error('Error fetching portfolio data', error);
        }
    };

    useEffect(() => {
        getPortfolio();
    }, [portfolioType]);

    const addFunds = async (amount) => {
        try {
            const response = await PortfolioService.addFunds(portfolioType, amount);
            setPortfolio(response.data.data);
        } catch (error) {
            console.error('Error adding funds', error);
        }
    };

    const withdrawFunds = async (amount) => {
        try {
            const response = await PortfolioService.withdrawFunds(portfolioType, amount);
            setPortfolio(response.data.data);
        } catch (error) {
            console.error('Error withdrawing funds', error);
        }
    };

    return { portfolio, addFunds, withdrawFunds, getPortfolio };
};

export default usePortfolio;