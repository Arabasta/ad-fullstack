import React, { useState } from 'react';
import {Button, HStack, VStack} from "@chakra-ui/react";
import InputBoxWhite from "../common/inputFields/InputBoxWhite";
import { useToast } from "@chakra-ui/react";
import useWallet from "../../hooks/useWallet";
import {formatCurrency} from "../../utils/formatCurrency";

const PortfolioRemoveFunds = ({ withdrawFunds, currentBalance, refreshWallet }) => {
    const [amount, setAmount] = useState('');
    const {wallet} = useWallet();
    const toast = useToast();

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleWithdraw = async () => {
        const amountNumber = parseFloat(amount);
        if (isNaN(amountNumber) || amountNumber <= 0) {
            toast({
                title: "Portfolio Fund Withdrawal Error",
                description: "Please enter an amount more than $0.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } else if (amountNumber > currentBalance) {
            toast({
                title: "Portfolio Fund Withdrawal Error",
                description: "Insufficient portfolio fund balance.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } else {
            try {
                withdrawFunds(amountNumber);
                toast({
                    title: "Portfolio Fund Withdrawal Success",
                    description: `Funds withdrawn to wallet: $${amountNumber}`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
                refreshWallet();
            } catch (error) {
                toast({
                    title: "Portfolio Fund Withdrawal Error",
                    description: "Server Error. Please try again later.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            }
        }
        setAmount('');
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
                    Withdraw
                </Button>
            </HStack>
        </VStack>
    );
};

export default PortfolioRemoveFunds;
