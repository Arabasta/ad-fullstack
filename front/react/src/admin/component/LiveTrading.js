import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLiveTrading from "../hooks/useLiveTrading";

const LiveTrading = () => {
    const navigate = useNavigate();
    const { message, isTrading, startLiveTrading, stopLiveTrading, getLiveTradingTransactions } = useLiveTrading();
    const [portfolioType, setPortfolioType] = useState('AGGRESSIVE');
    const [tickerType, setTickerType] = useState('CRYPTO');

    const handleStartLiveTrading = async () => {
        await startLiveTrading();
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
                    <select value={portfolioType} onChange={(e) => setPortfolioType(e.target.value)} disabled={isTrading}>
                        <option value="AGGRESSIVE">Aggressive</option>
                        <option value="CONSERVATIVE">Conservative</option>
                        <option value="MODERATE">Moderate</option>
                    </select>
                </label>
                <label>
                    Ticker Type:
                    <select value={tickerType} onChange={(e) => setTickerType(e.target.value)} disabled={isTrading}>
                        <option value="CRYPTO">Crypto</option>
                        <option value="STOCKS">Stocks</option>
                    </select>
                </label>
            </div>
            <button onClick={handleStartLiveTrading} disabled={isTrading}>Start Live Trading</button>
            <button onClick={handleStopLiveTrading} disabled={!isTrading}>Stop Live Trading</button>
            <button onClick={handleGetTransactions} >Get Transactions</button>

            {message && (
                <p style={{ color: isTrading ? 'green' : 'red' }}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default LiveTrading
