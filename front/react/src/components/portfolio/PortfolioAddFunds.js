import React, { useState } from 'react';
import useWallet from "../../hooks/useWallet";
import {Button, HStack, VStack} from "@chakra-ui/react";
import InputBoxWhite from "../common/inputFields/InputBoxWhite";

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
            setError('Please enter a valid amount more than $0');
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
                <Button onClick={handleAddFunds}
                        shadow="sm"
                        fontSize="md"
                        height="2rem"
                        width="6rem">
                    Add
                </Button>
            </HStack>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </VStack>
    );
};

export default PortfolioAddFunds;
