import React, { useState } from 'react';
import WalletService from '../../services/WalletService';
import {chakra, Flex} from "@chakra-ui/react";

// the onAddFunds function is passed as a prop
// this function will be called when the deposit is done
// this will update the wallet balance
// this is optional, so if you have a page for adding funds only (that doesn't need to update the balance)
const WalletAddFunds = ({ onAddFunds }) => {
    const [depositAmount, setDepositAmount] = useState('');

    const handleDeposit = async () => {
        try {
            const amount = parseFloat(depositAmount);
            if (amount <= 0) {
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
            <Flex
                alignItems="center"
                justifyContent="center"
                py={2}
                px={1}
                bg="gray.200"
                _dark={{bg: "gray.700"}}
            >
                <chakra.span
                    fontWeight="bold"
                    w="xs"
                    color="gray.800"
                    _dark={{color: "gray.200"}}>
                    <Flex
                        alignItems="center"
                        justifyContent="space-around"
                    margin=" 0">
                        $
                        <chakra.input
                            type="number"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            placeholder=" Enter amount"
                        />

                        <chakra.button
                            onClick={handleDeposit}
                            bg="gray.800"
                            px="4"
                            fontSize="sm"
                            fontWeight="bold"
                            color="white"
                            py={1}
                            rounded="lg"
                            textTransform="uppercase"
                            _hover={{
                                bg: "gray.700",
                                _dark: {bg: "gray.600"},
                            }}
                            _focus={{
                                bg: "gray.700",
                                _dark: {bg: "gray.600"},
                                outline: "none",
                            }}
                        >
                            Deposit
                        </chakra.button>
                    </Flex>

                </chakra.span>
            </Flex>
        </div>
    );
};

export default WalletAddFunds;
