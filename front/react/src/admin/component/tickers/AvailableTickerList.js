import React from 'react';
import AvailableTickerItem from './AvailableTickerItem';

const AvailableTickerList = ({ tickers = [], onAdd }) => {
    if (!tickers.length) return <div>No available tickers</div>; // Handle empty tickers array

    return (
        <div>
            {tickers.map(ticker => (
                <AvailableTickerItem key={ticker.tickerName} ticker={ticker} onAdd={onAdd} />
            ))}
        </div>
    );
};

export default AvailableTickerList;
