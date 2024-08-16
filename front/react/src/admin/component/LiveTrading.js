import React, { useState, useEffect } from 'react';
import useLiveTrading from "../hooks/useLiveTrading";
import CallToActionSection from "./sections/CallToActionSection";
import Button from "../../components/common/buttons/Button";
import {FormControl, FormLabel, GridItem, HStack, Select, Text, useToast, VStack} from "@chakra-ui/react";
import TransactionsPage from "../pages/LiveTrading/TransactionsPage";
import { Modal } from "../../components/common/modal/Modal";

const LiveTrading = () => {
    const toast = useToast();
    const { isTrading, startLiveTrading, stopLiveTrading, getAlgorithmTypes, algorithmTypes , getStatus} = useLiveTrading();
    const [algorithmType, setAlgorithmType] = useState('');

    useEffect(() => {
        getAlgorithmTypes();
    }, [getAlgorithmTypes]);

    useEffect(() => {
        if (algorithmTypes.length > 0 && !algorithmType) {
            setAlgorithmType(algorithmTypes[0]);
        }
    }, [algorithmTypes, algorithmType]);

    useEffect(() => {
        getStatus();
    }, [getStatus]);

    const handleStartLiveTrading = async () => {
        if (!algorithmType) {
            toast({
                title: "Algorithm not selected",
                description: "Please select an algorithm to start live trading.",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
            return;
        }

        await startLiveTrading(algorithmType);
        toast({
            title: "Trading started.",
            description: "Live trading has been started successfully.",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top"
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
            position: "top"
        });
    };

    return (
        <div>
            <CallToActionSection title="Live Trading"
                                 subtitle="Select an Algorithm and start trading">

                <VStack>
                    <Text mt={4} fontSize="lg" color="gray.600">
                        Starting live trading will initiate the RoboTrader to begin live trading on the list of active tickers with the selected algorithm
                    </Text>
                    <HStack>
                        <FormControl as={GridItem} colSpan={[6, 3]}>
                            <FormLabel>Algorithm Type</FormLabel>
                            <Select
                                value={algorithmType}
                                onChange={(e) => setAlgorithmType(e.target.value)}
                                disabled={isTrading}
                                bg="gray.50"
                                borderColor="gray.300"
                                _hover={{ borderColor: "gray.400" }}
                                _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
                                _disabled={{ bg: "gray.100", cursor: "not-allowed" }}
                                width="500px"
                            >
                                {algorithmTypes.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </HStack>

                    <HStack>
                        <Button onClick={isTrading ? handleStopLiveTrading : handleStartLiveTrading}
                                w="20rem"
                                pl="1rem"
                                pr="1rem"
                        >
                            {isTrading ? 'Stop Live Trading' : 'Start Live Trading'}
                        </Button>
                        <Modal
                            triggerText="Get Transactions"
                            title={`Trade Transactions`}
                            onClose={() => {}}
                        >
                            <TransactionsPage type="trade"/>
                        </Modal>
                    </HStack>
                </VStack>
            </CallToActionSection>
        </div>
    );
};

export default LiveTrading;
