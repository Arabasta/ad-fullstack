import React, { useState } from 'react';
import useLiveTrading from '../hooks/useLiveTrading';
import FormSelect from "../../components/common/inputFields/FormSelect";
import Button from "../../components/common/buttons/Button";


const LiveTrading = () => {
    const [portfolioType, setPortfolioType] = useState('');
    const [tickerType, setTickerType] = useState('');
    const { transactions, startTrade, stopTrade, seeTransactions } = useLiveTrading(portfolioType, tickerType);

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

    return (
        <div>
            <FormSelect
                label="Portfolio Type"
                value={portfolioType}
                onChange={(value) => setPortfolioType(value)}
                options={[
                    { label: 'AGGRESSIVE', value: 'AGGRESSIVE' },
                    { label: 'MODERATE', value: 'MODERATE' },
                    { label: 'CONSERVATIVE', value: 'CONSERVATIVE' }
                ]}
                required
            />
            <FormSelect
                label="Ticker Type"
                value={tickerType}
                onChange={(value) => setTickerType(value)}
                options={[
                    { label: 'STOCKS', value: 'STOCKS' },
                    { label: 'CRYPTO', value: 'CRYPTO' }
                ]}
                required
            />
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
