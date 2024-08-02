import React, { useState } from 'react';
import WalletService from '../../services/WalletService';


const WalletWithdrawFunds = ({ onWithdrawFunds,wallet }) => {
    const [withdrawAmount, setWithdrawAmount] = useState('');

    const handleWithDraw = async () => {
        try {
            const amount = parseFloat(withdrawAmount);
            if (isNaN(amount) || amount <= 0) {
                alert('Invalid amount');
                return;
            }else if(withdrawAmount > wallet){
                alert('not enough fund');
                return;
            }


            await WalletService.withdrawFunds( amount );
            onWithdrawFunds(); // call the prop function if it exists
            setWithdrawAmount('') // clear the input
        } catch (error) {
            console.error('Error depositing money', error);
        }
    };

    return (
        <div>
            <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
            />
            <button onClick={handleWithDraw}>Withdraw</button>
        </div>
    );
};

export default WalletWithdrawFunds;
