import React from "react";
import {Box, Flex, VStack} from "@chakra-ui/react";
import useWallet from "../hooks/useWallet";
import { formatCurrency } from "../utils/formatCurrency";
import { Modal } from "../components/common/modal/Modal";
import TransactionHistory from "../components/feature/TransactionHistory";
import WalletAction from "../components/feature/WalletAction";
import BlackText from "../components/common/text/BlackText";
import CallToActionSection from "../admin/component/sections/CallToActionSection";

const WalletPage = () => {
    const { wallet, getWallet } = useWallet();

    return (
        <CallToActionSection title="Wallet Balance" subtitle="">>
            <VStack spacing={4} align="stretch">
                <BlackText fontSize="5xl" fontWeight="bold">{formatCurrency(wallet)}</BlackText>
                <Flex>
                    <WalletAction flexGrow="2" type="deposit" onActionComplete={getWallet} />
                    <Box ml="0.5rem" mr="0.5rem"></Box>
                    <WalletAction flexGrow="2" type="withdraw" onActionComplete={getWallet} />
                </Flex>

                {/* View History Button */}
                <Modal triggerText="View Wallet History" title="Wallet History">
                    <TransactionHistory type="wallet" />
                </Modal>
            </VStack>
        </CallToActionSection>
    );
};

export default WalletPage;
