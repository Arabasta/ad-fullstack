import React, { useState } from 'react';
import useBackTest from '../../hooks/useBackTest';
import TickerList from '../../component/TickerList';
import BackTestService from '../../services/BackTestService';
import { useNavigate } from 'react-router-dom';
import {FormControl, FormLabel, GridItem, HStack, Input, Select, Text, useToast, VStack} from "@chakra-ui/react";
import {Modal} from "../../../components/common/modal/Modal";
import Button from "../../../components/common/buttons/Button";
import CallToActionSection from "../../component/sections/CallToActionSection";
import RedText from "../../../components/common/text/RedText";

const BackTestPage = () => {
    const { algorithms, portfolioTypes, tickerList, loading, error } = useBackTest();
    const [selectedPortfolioType, setSelectedPortfolioType] = useState('');
    const [selectedAlgorithmType, setSelectedAlgorithmType] = useState('');
    const [amount, setAmount] = useState('');
    const toast = useToast();
    const [validationError, setValidationError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTicker] = useState(null);
    const navigate = useNavigate();

    const handlePortfolioTypeChange = (event) => {
        setSelectedPortfolioType(event.target.value);
    };

    const handleAlgorithmTypeChange = (event) => {
        setSelectedAlgorithmType(event.target.value);
    };

    const handleAmountChange = (event) => {
        const value = event.target.value
        setAmount(value);
        if (parseFloat(value) <= 0 || parseFloat(value) > 1000000000) {
            setValidationError('Please enter a valid amount between 0 and 1000,000,000');
        } else {
            setValidationError('');
        }
    };

    const handleRunGlobalBackTest = async () => {
        if (selectedPortfolioType && selectedAlgorithmType && amount) {
            setIsLoading(true);
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
                navigate('/backtest-result',
                    { state:
                            {
                                labels: response.data.data.labels,
                                datasets: response.data.data.datasets,
                                tickerName: selectedTicker,
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
            } finally {
                setIsLoading(false);
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
        <CallToActionSection title="Back Test" subtitle="Confidence, Precision, and Profit">
            <VStack spacing={4} align="stretch">
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error.message}</p>}
                <Text mt={4} fontSize="lg" color="gray.600">
                    At FourQuant, we thoroughly test our strategies before implementation to provide you with the best returns.
                    Try running our backtest on our curated list of strategies and see for yourself.
                </Text>
                <Text fontSize="lg" color="gray.600">
                    Starting back testing is as simple as selecting a portfolio, algorithm and amount, and run by portfolio type or on individual tickers.
                </Text>
                <Text fontSize="lg" color="gray.600">
                    We
                    <Text as='span' style={{ fontWeight: 'bold' }}> limit back testing to the past 1 week </Text>
                    to ensure that our strategies are tested against the most current market conditions, allowing for more relevant and actionable insights.
                </Text>
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
                            width="400px"
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
                {validationError && <RedText mt={2}>{validationError}</RedText>}


                <HStack spacing={4}>
                    <Button onClick={handleRunGlobalBackTest} isDisabled={!!validationError}>
                        Run by portfolio type
                    </Button>

                    <Modal
                        triggerText="Run on selected ticker"
                        title="Ticker List"
                        onOpen={() => {}}
                        onClose={() => {}}
                    >
                        <TickerList tickerList={tickerList} selectedAlgorithmType={selectedAlgorithmType} amount={amount} validationError={validationError}/>
                    </Modal>
                    {isLoading && (
                      <Text fontSize="xl" fontWeight="bold" color="black.600" textAlign="up">
                          Loading...
                      </Text>
                    )}
                </HStack>
                <Text mt={4} fontSize="sm" color="gray.600">
                    * Results are for illustration purposes and returns are not guaranteed<br/>
                    We may or may not trade using the listed algorithms and tickers
                </Text>
            </VStack>

        </CallToActionSection>


    );
};

export default BackTestPage;
