import React from 'react';
import PropTypes from 'prop-types';
import BlackText from "../../../components/common/text/BlackText";
import Button from "../../../components/common/buttons/Button";


const AvailableTickerItem = ({ ticker, onAdd }) => {
    return (
        <div>
            <BlackText>{ticker.tickerType}: {ticker.tickerName}</BlackText>
            <Button onClick={() => onAdd(ticker)}>Add</Button>
        </div>
    );
};

AvailableTickerItem.propTypes = {
    ticker: PropTypes.shape({
        tickerType: PropTypes.string.isRequired,
        tickerName: PropTypes.string.isRequired
    }).isRequired,
    onAdd: PropTypes.func.isRequired
};

export default AvailableTickerItem;
