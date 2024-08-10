import React, { useState } from 'react';
import {Button, HStack, VStack} from "@chakra-ui/react";
import InputBoxWhite from "../common/inputFields/InputBoxWhite";

const PortfolioRemoveFunds = ({ withdrawFunds, currentBalance }) => {
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
            setError('Please enter a valid amount more than $0');
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
        <VStack mb="0.5rem">
            <HStack>
                <InputBoxWhite
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Amount"
                    min="0"
                    step="0.01"
                    height="2rem"
                    width="10rem"
                />
                <Button onClick={handleWithdraw}
                        shadow="sm"
                        fontSize="md"
                        height="2rem"
                        width="6rem">
                    Remove
                </Button>
            </HStack>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {success && <p style={{color: 'green'}}>{success}</p>}
        </VStack>
    );
};

export default PortfolioRemoveFunds;
