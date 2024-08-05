import React, { useState } from 'react';
import useLiveTrading from "../hooks/useLiveTrading";
import Button from "../../components/elements/buttons/Button";

// todo: convert list to table below
// todo: format the transaction details (see API doc)
const LiveTrading = () => {
    const [portfolioType, setPortfolioType] = useState('');
    const [tickerType, setTickerType] = useState('');
    const {transactions, startTrade, stopTrade, seeTransactions,} = useLiveTrading(portfolioType, tickerType);

    const handleStartTrade = async () => {
        try {
            if (tickerType === '') {
                alert('You have not selected a ticker type');
                return;
            }
            await startTrade();
        } catch (error) {
            console.error('Error starting trade', error);
        }
    };

    const handleStopTrade = async () => {
        try {
            await stopTrade();
        } catch (error) {
            console.error('Error stopping trade', error);
        }
    };

    const handleSeeTransactions = async () => {
        try {
            if (portfolioType === '') {
                alert('You have not selected a portfolio type');
                return;
            }
            await seeTransactions();
        } catch (error) {
            console.error('Error seeing transactions', error);
        }
    };

    const handlePortfolioTypeChange = (e) => {
        const portfolioType = e.target.value;
        setPortfolioType(portfolioType);
    };

    const handleTickerTypeChange = (e) => {
        const tickerType = e.target.value;
        setTickerType(tickerType);
    };

    return (
        <div>
            <label>
                Portfolio Type:
                <select value={portfolioType} onChange={handlePortfolioTypeChange}>
                    <option value="AGGRESSIVE">AGGRESSIVE</option>
                    <option value="MODERATE">MODERATE</option>
                    <option value="CONSERVATIVE">CONSERVATIVE</option>
                </select>
            </label>
            <label>
                Ticker Type:
                <select value={tickerType} onChange={handleTickerTypeChange}>
                    <option value="STOCKS">STOCKS</option>
                    <option value="CRYPTO">CRYPTO</option>
                </select>
            </label>
            <Button onClick={handleStartTrade}>Start Trade</Button>
            <Button onClick={handleStopTrade}>Stop Trade</Button>
            <Button onClick={handleSeeTransactions}>See Transactions</Button>

            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>{transaction}</li>
                ))}
            </ul>
        </div>
    );
};

export default LiveTrading;
