import React, { useState } from 'react';
import WalletService from '../../services/WalletService';

// the onAddFunds function is passed as a prop
// this function will be called when the deposit is done
// this will update the wallet balance
// this is optional, so if you have a page for adding funds only (that doesn't need to update the balance)
const WalletAddFunds = ({ onAddFunds }) => {
    const [depositAmount, setDepositAmount] = useState('');

    const handleDeposit = async () => {
        try {
            const amount = parseFloat(depositAmount);
            if (isNaN(amount) || amount <= 0) {
                alert('Invalid amount');
                return;
            }

            // call the addFunds function from the WalletService
            // this will call the /wallet/add-funds api endpoint
            await WalletService.addFunds( amount );
            onAddFunds(); // call the prop function if it exists
            setDepositAmount('') // clear the input
        } catch (error) {
            console.error('Error depositing money', error);
        }
    };

    return (
        <div>
            <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Enter amount"
            />
            <button onClick={handleDeposit}>Deposit</button>
        </div>
    );
};

export default WalletAddFunds;
