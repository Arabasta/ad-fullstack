import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLiveTrading from "../hooks/useLiveTrading";

const LiveTrading = () => {
    const navigate = useNavigate();
    const { message, startLiveTrading, stopLiveTrading, getLiveTradingTransactions } = useLiveTrading();
    const [portfolioType, setPortfolioType] = useState('AGGRESSIVE');
    const [tickerType, setTickerType] = useState('CRYPTO');
    const [error, setError] = useState(null);

    const handleStartLiveTrading = async () => {
        setError(null);
        try {
            await startLiveTrading(portfolioType, tickerType);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleStopLiveTrading = async () => {
        setError(null);
        try {
            await stopLiveTrading();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGetTransactions = async () => {
        setError(null);
        try {
            await getLiveTradingTransactions(portfolioType);
            navigate(`/admin/transactions?portfolioType=${portfolioType}`);
        } catch (err) {
            setError(err.message);
        }
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

            {message && <p>Message: {message}</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};

export default LiveTrading;
