import React from 'react';
import PropTypes from 'prop-types';
import AvailableTickerItem from './AvailableTickerItem';
import BlackText from "../../../components/common/text/BlackText";


const AvailableTickerList = ({ tickers = [], onAdd }) => {
    if (!tickers.length) return <BlackText>No available tickers</BlackText>; // Handle empty tickers array

    return (
        <div>
            {tickers.map(ticker => (
                <AvailableTickerItem key={ticker.tickerName} ticker={ticker} onAdd={onAdd} />
            ))}
        </div>
    );
};

AvailableTickerList.propTypes = {
    tickers: PropTypes.arrayOf(
        PropTypes.shape({
            tickerType: PropTypes.string.isRequired,
            tickerName: PropTypes.string.isRequired
        })
    ).isRequired,
    onAdd: PropTypes.func.isRequired
};

export default AvailableTickerList;
