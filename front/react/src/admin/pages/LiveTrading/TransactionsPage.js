import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLiveTrading from '../../hooks/useLiveTrading';

const TransactionsPage = () => {
    const { transactions, getLiveTradingTransactions, message } = useLiveTrading();
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const portfolioType = searchParams.get('portfolioType') || 'AGGRESSIVE'; // 默认值为 'AGGRESSIVE'

    useEffect(() => {
        const fetchTransactions = async () => {
            setError(null);
            try {
                await getLiveTradingTransactions(portfolioType);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            }
        };

        fetchTransactions();
    }, [getLiveTradingTransactions, portfolioType]);

    return (
        <div>
            <h1>Transactions</h1>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {message && <p>{message}</p>}
            {transactions ? (
                <div>
                    <pre>{JSON.stringify(transactions, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading transactions...</p>
            )}
        </div>
    );
};

export default TransactionsPage;
