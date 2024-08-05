import React from 'react';
import AvailableTickerItem from './AvailableTickerItem';

const AvailableTickerList = ({ tickers, onAdd }) => {
    return (
        <div>
            {tickers.map(ticker => (
                <AvailableTickerItem key={ticker.id} ticker={ticker} onAdd={onAdd} />
            ))}
        </div>
    );
};

export default AvailableTickerList;