import React, { useState } from 'react';
import useBackTest from '../../hooks/useBackTest';
import TickerList from '../../component/TickerList';
import BackTestService from '../../services/BackTestService';
import { useNavigate } from 'react-router-dom';
import {FormControl, FormLabel, GridItem, HStack, Input, Select, useToast, VStack} from "@chakra-ui/react";
import {Modal} from "../../../components/common/modal/Modal";
import Button from "../../../components/common/buttons/Button";
import CallToActionSection from "../../component/sections/CallToActionSection";

const BackTestPage = () => {
    const { algorithms, portfolioTypes, tickerList, loading, error } = useBackTest();
    const [selectedPortfolioType, setSelectedPortfolioType] = useState('');
    const [selectedAlgorithmType, setSelectedAlgorithmType] = useState('');
    const [amount, setAmount] = useState('');
    const toast = useToast();

    const [selectedTicker] = useState(null);
    const navigate = useNavigate();

    const handlePortfolioTypeChange = (event) => {
        setSelectedPortfolioType(event.target.value);
    };

    const handleAlgorithmTypeChange = (event) => {
        setSelectedAlgorithmType(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleRunGlobalBackTest = async () => {
        if (selectedPortfolioType && selectedAlgorithmType && amount) {
            try {
                console.log('Running BackTest with:', {
                    portfolioType: selectedPortfolioType,
                    amount: amount,
                    algorithmType: selectedAlgorithmType,
                    ticker: selectedTicker
                });

                const response = await BackTestService.runBackTest(
                    selectedPortfolioType,
                    amount,
                    selectedAlgorithmType,
                    selectedTicker
                );
                navigate('/admin/backtest-result',
                    { state:
                            {
                                labels: response.data.data.labels,
                                datasets: response.data.data.datasets,
                                tickerName: selectedTicker,
                                tickerType: selectedTicker.type,
                                portfolioType: selectedPortfolioType,
                                algorithmType: selectedAlgorithmType
                            }
                    });
            } catch (error) {
                toast({
                    title: 'Error running backtest',
                    description: error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: "top"
                });
            }
        } else {
            toast({
                title: 'Missing Information',
                description: 'Please select a portfolio type, algorithm type, and amount.',
                status: 'warning',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <CallToActionSection title="Back Test" subtitle="Measure Algorithm Performance">
            <VStack spacing={4} align="stretch">
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error.message}</p>}

                <HStack>
                    <FormControl as={GridItem} colSpan={[6, 3]}>
                        <FormLabel>Portfolio Type</FormLabel>
                        <Select
                            value={selectedPortfolioType}
                            onChange={handlePortfolioTypeChange}
                            placeholder="Select Portfolio Type"
                        >
                            {portfolioTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 3]}>
                        <FormLabel>Select Algorithm Type</FormLabel>
                        <Select
                            value={selectedAlgorithmType}
                            onChange={handleAlgorithmTypeChange}
                            placeholder="Select Algorithm Type"
                            width="300px"
                        >
                            {algorithms.map((algo) => (
                                <option key={algo} value={algo}>
                                    {algo}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </HStack>
                    <FormControl as={GridItem} colSpan={[6, 4]}>
                        <FormLabel>
                            Amount
                        </FormLabel>
                        <Input
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="Enter amount"
                        />
                    </FormControl>



                <HStack spacing={4}>
                    <Button onClick={handleRunGlobalBackTest}>
                        Run on all tickers
                    </Button>

                    <Modal
                        triggerText="Run on selected ticker"
                        title="Ticker List"
                        onOpen={() => {}}
                        onClose={() => {}}
                    >
                        <TickerList tickerList={tickerList} selectedAlgorithmType={selectedAlgorithmType} amount={amount} />
                    </Modal>
                </HStack>

            </VStack>

        </CallToActionSection>


    );
};

export default BackTestPage;
