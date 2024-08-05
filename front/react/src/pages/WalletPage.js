import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import useWallet from "../hooks/useWallet";
import WalletAddFunds from "../components/wallet/WalletAddFunds";
import WalletWithdrawFunds from "../components/wallet/WalletWithdrawFunds";
import SimpleImageCard from "../components/elements/cards/SimpleImageCard";
import creditCardLogo from "../assets/images/card-visa-background.jpg";
import { formatCurrency } from "../utils/formatCurrency";
import { Modal } from "../components/elements/modal/Modal";
import TransactionHistory from "../components/feature/TransactionHistory";

// todo: WalletBalance thing redesign
const WalletPage = () => {
    const { wallet, getWallet } = useWallet();

    return (
        <Box p={6} maxW="800px" mx="auto">
            <SimpleImageCard
                image={creditCardLogo}
                title="Wallet Balance: "
                spanText={formatCurrency(wallet)}
            />
            <VStack spacing={4} mt={8}>
                <WalletAddFunds onAddFunds={getWallet} />
                <WalletWithdrawFunds onWithdrawFunds={getWallet} />

                <Modal triggerText="View History" title="Wallet History">
                    <TransactionHistory type="wallet" />
                </Modal>
            </VStack>
        </Box>
    );
};

export default WalletPage;
