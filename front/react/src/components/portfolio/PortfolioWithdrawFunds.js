import React, { useState } from 'react';

const PortfolioWithdrawFunds = ({ withdrawFunds, currentBalance }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        if (error) {
            setError('');
        }
        if (success) {
            setSuccess('');
        }
    };

    const handleWithdraw = async () => {
        const amountNumber = parseFloat(amount);
        if (isNaN(amountNumber) || amountNumber <= 0) {
            setError('Please enter a valid amount');
        } else if (amountNumber > currentBalance) {
            setError('Insufficient allocated balance');
        } else {
            try {
                await withdrawFunds(amountNumber);
                setAmount('');
                setError('');
                setSuccess('Funds withdrawn successfully');
            } catch (error) {
                setError('Failed to withdraw funds');
                setSuccess('');
            }
        }
    };

    return (
        <div>
            <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Amount"
                min="0"
                step="0.01"
            />
            <button onClick={handleWithdraw}>Withdraw</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default PortfolioWithdrawFunds;
