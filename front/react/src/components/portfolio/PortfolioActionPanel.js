import Text from "../common/text/Text";
import {VStack} from "@chakra-ui/react";
import BoxBorderGray from "../common/modal/Box-BorderGray";
import PortfolioAddFunds from "./PortfolioAddFunds";
import PortfolioRemoveFunds from "./PortfolioRemoveFunds";
import PortfolioTransactionHistoryPage from "../../pages/portfolio/PortfolioTransactionHistoryPage";
import RulesModal from "../rules/RulesModal";
import React, {useEffect} from "react";
import useWallet from "../../hooks/useWallet";
import BlackText from "../common/text/BlackText";
import {formatCurrency} from "../../utils/formatCurrency";
import GrayText from "../common/text/GrayText";
import WhiteBoxCard from "../common/cards/WhiteBoxCard";


const PortfolioActionPanel = ({addFunds, withdrawFunds, portfolio, portfolioType, modalTitle}) => {
    const { wallet, getWallet } = useWallet();

    // Re-fetch wallet balance when the component re-renders
    useEffect(() => {
        getWallet();
    }, [getWallet]);  // This will ensure the wallet balance is always up-to-date

    return (
        <BoxBorderGray className="right-panel" p={4} bg="gray.200" w="max-content"
                       boxShadow="2xl" height="full"
                       flexDirection="column" justifyContent="space-between">
            <Text color="black" pb="1.5rem" fontSize="xl" fontWeight={600}>
                Action Panel
            </Text>
            <VStack>
                {/*Portfolio Fund Action*/}
                <BoxBorderGray p={4} mb={4} boxShadow="md" bg="white">
                    <Text color="black" fontSize="lg" fontWeight={500}>
                        Portfolio Fund Action
                    </Text>
                    <VStack p="1rem">
                        {/* Balance Display */}
                        <WhiteBoxCard mb="1rem">
                            <GrayText fontSize="xl" fontWeight="bold">Wallet Balance</GrayText>
                            <BlackText fontSize="xl" fontWeight="bold">{formatCurrency(wallet)}</BlackText>
                        </WhiteBoxCard>

                        <PortfolioAddFunds
                            addFunds={addFunds}
                            refreshWallet={getWallet}/>
                        <PortfolioRemoveFunds
                            withdrawFunds={withdrawFunds}
                            currentBalance={portfolio.allocatedBalance}
                            refreshWallet={getWallet}/>
                        <PortfolioTransactionHistoryPage
                            portfolioType={portfolioType}/>
                    </VStack>
                </BoxBorderGray>

                {/*Portfolio Rules*/}
                <BoxBorderGray p={4} mb={4} boxShadow="md" bg="gray.50">
                    <Text color="black" pb="1.5rem" fontSize="lg" fontWeight={500}>
                        Portfolio Rules
                    </Text>
                    {/* Manage Rules Modal Button */}
                    <RulesModal triggerText="Manage Rules"
                                modalTitle={modalTitle}
                                portfolioType={portfolioType}
                                p={5}/>
                </BoxBorderGray>
            </VStack>
        </BoxBorderGray>
    )
}

export default PortfolioActionPanel;