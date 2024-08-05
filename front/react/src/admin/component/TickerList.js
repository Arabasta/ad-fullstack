import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackTestService from '../services/BackTestService';

const TickerList = ({ tickerList, portfolioTypes }) => {
    const [selectedPortfolioType, setSelectedPortfolioType] = useState({});
    const navigate = useNavigate();

    const handlePortfolioTypeChange = (tickerName, portfolioType) => {
        setSelectedPortfolioType((prevSelected) => ({
            ...prevSelected,
            [tickerName]: portfolioType,
        }));
    };

    const handleRunBackTest = async (tickerName) => {
        const portfolioType = selectedPortfolioType[tickerName];
        if (portfolioType) {
            try {
                const response = await BackTestService.runBackTest(tickerName, portfolioType);
                navigate('/admin/backtest-result', { state: response.data.data });
            } catch (error) {
                console.error('Error running backtest', error);
            }
        } else {
            alert('Please select a portfolio type');
        }
    };

    return (
        <div>
            <h2>Ticker List</h2>
            {tickerList.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ticker Type</th>
                        <th>Ticker Name</th>
                        <th>Portfolio Type</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickerList.map((ticker) => (
                        <tr key={ticker.id}>
                            <td>{ticker.id}</td>
                            <td>{ticker.tickerType}</td>
                            <td>{ticker.tickerName}</td>
                            <td>
                                <select
                                    value={selectedPortfolioType[ticker.tickerName] || ''}
                                    onChange={(e) =>
                                        handlePortfolioTypeChange(ticker.tickerName, e.target.value)
                                    }
                                >
                                    <option value="" disabled>
                                        Select Portfolio Type
                                    </option>
                                    {portfolioTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button onClick={() => handleRunBackTest(ticker.tickerName)}>
                                    Run BackTest
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No tickers available</p>
            )}
        </div>
    );
};

export default TickerList;
