import React, { useState } from 'react';
import WalletService from '../../services/WalletService';
import {chakra, Flex} from "@chakra-ui/react";

const WalletWithdrawFunds = ({ onWithdrawFunds,wallet }) => {
    const [withdrawAmount, setWithdrawAmount] = useState('');

    const handleWithDraw = async () => {
        try {
            const amount = parseFloat(withdrawAmount);
            if (amount <= 0) {
                alert('Invalid amount');
                return;
            } else if(withdrawAmount > wallet){
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
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            placeholder=" Enter amount"
                        />

                        <chakra.button
                            onClick={handleWithDraw}
                            bg="gray.800"
                            px="2"
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
                            Withdraw
                        </chakra.button>
                    </Flex>

                </chakra.span>
            </Flex>
        </div>
    );
};

export default WalletWithdrawFunds;
