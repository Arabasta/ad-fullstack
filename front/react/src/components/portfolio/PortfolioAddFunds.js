import React, { useState } from 'react';

const PortfolioAddFunds = ({ addFunds }) => {
    const [amount, setAmount] = useState('');

    const handleAmountChange = (e) => {
        setAmount(Number(e.target.value));
    };

    return (
        <div>
            <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Amount"
            />
            <button onClick={() => addFunds(amount)}>Add</button>
        </div>
    );
};

export default PortfolioAddFunds;
