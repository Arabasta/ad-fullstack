import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLiveTrading from "../hooks/useLiveTrading";

const LiveTrading = () => {
    const navigate = useNavigate();
    const { message, status, startLiveTrading, stopLiveTrading, getLiveTradingTransactions } = useLiveTrading();
    const [portfolioType, setPortfolioType] = useState('AGGRESSIVE');
    const [tickerType, setTickerType] = useState('CRYPTO');

    const handleStartLiveTrading = async () => {
        await startLiveTrading(portfolioType, tickerType);
    };

    const handleStopLiveTrading = async () => {
        await stopLiveTrading();
    };

    const handleGetTransactions = async () => {
        await getLiveTradingTransactions(portfolioType);
        navigate(`/admin/transactions?portfolioType=${portfolioType}`);
    };

    return (
        <div>
            <div>
                <label>
                    Portfolio Type:
                    <select value={portfolioType} onChange={(e) => setPortfolioType(e.target.value)}>
                        <option value="AGGRESSIVE">Aggressive</option>
                        <option value="CONSERVATIVE">Conservative</option>
                        <option value="BALANCED">Balanced</option>
                    </select>
                </label>
                <label>
                    Ticker Type:
                    <select value={tickerType} onChange={(e) => setTickerType(e.target.value)}>
                        <option value="CRYPTO">Crypto</option>
                        <option value="STOCKS">Stocks</option>
                    </select>
                </label>
            </div>
            <button onClick={handleStartLiveTrading}>Start Live Trading</button>
            <button onClick={handleStopLiveTrading}>Stop Live Trading</button>
            <button onClick={handleGetTransactions}>Get Transactions</button>

            {message && (
                <p style={{ color: status === 'success' ? 'green' : 'red' }}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default LiveTrading;
