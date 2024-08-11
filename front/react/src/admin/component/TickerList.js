import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackTestService from '../services/BackTestService';

const TickerList = ({ tickerList, selectedPortfolioType, selectedAlgorithmType, amount }) => {
    const navigate = useNavigate();

    const handleRunBackTest = async (tickerName) => {
        if (selectedPortfolioType && selectedAlgorithmType && amount) {
            try {
                const response = await BackTestService.runBackTest(
                    selectedPortfolioType,
                    amount,
                    selectedAlgorithmType,
                    tickerName
                );
                navigate('/admin/backtest-result', { state: response.data.data });
            } catch (error) {
                console.error('Error running backtest', error);
            }
        } else {
            alert('Please ensure that Portfolio Type, Algorithm Type, and Amount are selected');
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
