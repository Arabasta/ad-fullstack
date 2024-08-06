import React from 'react';
import useRule from "../../hooks/useRule";

const ResetStopLossTriggerByPortfolio = ({ portfolioType }) => {
    const {  loading, error, resetStopLoss } = useRule(portfolioType);

    const handleReset = () => {
        resetStopLoss();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Reset Stop Loss Trigger for {portfolioType}</h2>
            <button onClick={handleReset}>Reset Stop Loss</button>
        </div>
    );
};

export default ResetStopLossTriggerByPortfolio;
