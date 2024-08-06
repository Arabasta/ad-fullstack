import React from 'react';

const ResetStopLossTriggerByPortfolio = ({ portfolioType, onReset }) => {
    return (
        <div>
            <h2>Reset Stop Loss Trigger for {portfolioType}</h2>
            <button onClick={onReset}>Reset Stop Loss</button>
        </div>
    );
};

export default ResetStopLossTriggerByPortfolio;
