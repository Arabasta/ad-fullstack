import React from 'react';
import ActiveTickerItem from './ActiveTickerItem';

const TickerList = ({ tickers, onDelete }) => {
    return (
        <div>
            {tickers.map(ticker => (
                <ActiveTickerItem key={ticker.id} ticker={ticker} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default TickerList;