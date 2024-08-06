import React from 'react';
import PropTypes from 'prop-types';
import BlackText from "../../../components/common/text/BlackText";
import Button from "../../../components/common/buttons/Button";


const ActiveTickerItem = ({ ticker, onDelete }) => {
    return (
        <div>
            <BlackText>{ticker.tickerType}: {ticker.tickerName}</BlackText>
            <Button onClick={() => onDelete(ticker.tickerName)}>Delete</Button>
        </div>
    );
};

ActiveTickerItem.propTypes = {
    ticker: PropTypes.shape({
        tickerType: PropTypes.string.isRequired,
        tickerName: PropTypes.string.isRequired
    }).isRequired,
    onDelete: PropTypes.func.isRequired
};

export default ActiveTickerItem;
