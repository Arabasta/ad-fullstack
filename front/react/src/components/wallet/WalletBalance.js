import React from 'react';

const WalletBalance = ({ wallet }) => {
    return (
        <div>
            {wallet !== null ? (
                <p>Wallet Balance: {wallet}</p>
            ) : (
                <p>Loading wallet...</p>
            )}
        </div>
    );
};

export default WalletBalance;
