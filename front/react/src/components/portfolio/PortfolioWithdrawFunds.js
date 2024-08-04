import React, { useState } from 'react';

const PortfolioWithdrawFunds = ({ withdrawFunds, currentBalance }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        if (error) {
            setError('');
        }
    };

    const handleWithdraw = () => {
        if (amount > currentBalance) {
            setError('Insufficient balance');
        } else {
            withdrawFunds(amount);
        }
    };

    return (
        <div>
            <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Amount"
            />
            <button onClick={handleWithdraw}>Withdraw</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default PortfolioWithdrawFunds;
