import React from 'react';

const PortfolioDetails = ({ portfolio }) => {
    return (
        <div>
            {portfolio !== null ? (
                <div>
                    <p>Portfolio Type: {portfolio.portfolioType}</p>
                    <p>Allocated Balance: {portfolio.allocatedBalance}</p>
                    <p>Current Value: {portfolio.currentValue}</p>
                </div>
            ) : (
                <p>Loading portfolio...</p>
            )}
        </div>
    );
};

export default PortfolioDetails;
