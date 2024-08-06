import React from 'react';
import PropTypes from 'prop-types';
import ActiveTickerItem from './ActiveTickerItem';
import BlackText from "../../../components/common/text/BlackText";


const TickerList = ({ tickers, onDelete }) => {
    if (!tickers.length) return <BlackText>No active tickers</BlackText>; // Handle empty tickers array

    return (
        <div>
            {tickers.map(ticker => (
                <ActiveTickerItem key={ticker.id} ticker={ticker} onDelete={onDelete} />
            ))}
        </div>
    );
};

TickerList.propTypes = {
    tickers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            tickerType: PropTypes.string.isRequired,
            tickerName: PropTypes.string.isRequired
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired
};

export default TickerList;
