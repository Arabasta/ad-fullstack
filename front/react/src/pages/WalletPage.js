import React from "react";
import {Box, HStack, VStack} from "@chakra-ui/react";
import useWallet from "../hooks/useWallet";
import { formatCurrency } from "../utils/formatCurrency";
import { Modal } from "../components/common/modal/Modal";
import TransactionHistory from "../components/feature/TransactionHistory";
import WalletAction from "../components/feature/WalletAction";
import BlackText from "../components/common/text/BlackText";
import GrayText from "../components/common/text/GrayText";
import WhiteBoxCard from "../components/common/cards/WhiteBoxCard";

const WalletPage = () => {
    const { wallet, getWallet } = useWallet();

    return (
        <Box p={4} maxW="500px" mx="auto"  borderRadius="lg" mt={6}>
            <VStack spacing={4} mt={8}>

                {/* Balance Display */}
                <WhiteBoxCard>
                    <GrayText fontSize="2xl" fontWeight="bold">Balance</GrayText>
                    <BlackText fontSize="5xl" fontWeight="bold">{formatCurrency(wallet)}</BlackText>
                </WhiteBoxCard>

                {/* Withdraw and Deposit Buttons */}
                <HStack w="full" justify="center" mt={4} mb={30}>
                    <WalletAction type="deposit" onActionComplete={getWallet} />
                    <WalletAction type="withdraw" onActionComplete={getWallet} />
                </HStack>

                {/* View History Button */}
                <Modal triggerText="View Wallet History" title="Wallet History">
                    <TransactionHistory type="wallet" />
                </Modal>
            </VStack>
        </Box>
    );
};

export default WalletPage;
