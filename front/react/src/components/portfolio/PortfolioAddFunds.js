import React, { useState } from 'react';
import useWallet from "../../hooks/useWallet";

const PortfolioAddFunds = ({ addFunds }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const {wallet} = useWallet();

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleAddFunds = () => {
        const amountNumber = parseFloat(amount);
        setSuccess(''); // Clear success message before checking
        if (isNaN(amountNumber) || amountNumber <= 0) {
            setError('Please enter a valid amount');
        } else if (amountNumber > wallet) {
            setError('Insufficient wallet balance');
            setSuccess('')
        } else {
            addFunds(amountNumber);
            setAmount('');
            setError('');
            setSuccess('Funds added successfully');
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
            <button onClick={handleAddFunds}>Add</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default PortfolioAddFunds;
