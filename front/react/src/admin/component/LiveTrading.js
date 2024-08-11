import React, { useState } from 'react';
import useLiveTrading from "../hooks/useLiveTrading";
import CallToActionSection from "./sections/CallToActionSection";
import Button from "../../components/common/buttons/Button";
import {FormControl, FormLabel, GridItem, HStack, Select, useToast, VStack} from "@chakra-ui/react";
import TransactionsPage from "../pages/LiveTrading/TransactionsPage";
import {Modal} from "../../components/common/modal/Modal";

const LiveTrading = () => {
    const toast = useToast();
    const {isTrading, startLiveTrading, stopLiveTrading, getLiveTradingTransactions } = useLiveTrading();
    const [portfolioType, setPortfolioType] = useState('AGGRESSIVE');
    const [tickerType, setTickerType] = useState('CRYPTO');

    const handleStartLiveTrading = async () => {
        await startLiveTrading();
        toast({
            title: "Trading started.",
            description: "Live trading has been started successfully.",
            status: "success",
            duration: 2000,
            isClosable: true,
            position:"top"
        });
    };

    const handleStopLiveTrading = async () => {
        await stopLiveTrading();
        toast({
            title: "Trading stopped.",
            description: "Live trading has been stopped.",
            status: "info",
            duration: 5000,
            isClosable: true,
            position:"top"
        });
    };

    const handleGetTransactions = async () => {
        await getLiveTradingTransactions(portfolioType);
        toast({
            title: "Transactions retrieved.",
            description: "Live trading transactions have been retrieved.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position:"top"
        });
        //setShowTransactions(true);  // Show the TransactionsPage
        //navigate(`/admin/transactions?portfolioType=${portfolioType}`);
    };
    const portfolioOptions = [
        { label: 'Aggressive', value: 'AGGRESSIVE' },
        { label: 'Conservative', value: 'CONSERVATIVE' },
        { label: 'Moderate', value: 'MODERATE' }
    ];

    const tickerOptions = [
        { label: 'Crypto', value: 'CRYPTO' },
        { label: 'Stocks', value: 'STOCKS' }
    ];

    return (
        <div>
            <CallToActionSection>
                <VStack>
                    <HStack>
                        <FormControl as={GridItem} colSpan={[6, 3]}>
                            <FormLabel>Portfolio Type</FormLabel>
                            <Select
                                value={portfolioType}
                                onChange={(e) => setPortfolioType(e.target.value)}
                                disabled={isTrading}
                                bg="gray.50"
                                borderColor="gray.300"
                                _hover={{ borderColor: "gray.400" }}
                                _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
                                _disabled={{ bg: "gray.100", cursor: "not-allowed" }}
                                width="200px"
                            >
                                {portfolioOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl as={GridItem} colSpan={[6, 3]}>
                            <FormLabel>Ticker Type</FormLabel>
                            <Select
                                value={tickerType}
                                onChange={(e) => setTickerType(e.target.value)}
                                disabled={isTrading}
                                bg="gray.50"
                                borderColor="gray.300"
                                _hover={{ borderColor: "gray.400" }}
                                _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
                                _disabled={{ bg: "gray.100", cursor: "not-allowed" }}
                                width="100px"
                            >
                                {tickerOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </HStack>

                    <HStack>
                        <Button onClick={isTrading ? handleStopLiveTrading : handleStartLiveTrading}
                                style={{width: '150px'}}>
                            {isTrading ? 'Stop Live Trading' : 'Start Live Trading'}
                        </Button>
                        <Modal
                            triggerText="Get Transactions"
                            title={`Transactions for ${portfolioType}`}
                            onOpen={handleGetTransactions}
                            onClose={() => {}}
                        >
                            <TransactionsPage portfolioType={portfolioType}/>
                        </Modal>

                    </HStack>
                </VStack>
            </CallToActionSection>
        </div>
    );
};

export default LiveTrading;
