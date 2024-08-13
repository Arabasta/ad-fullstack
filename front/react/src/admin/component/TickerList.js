import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackTestService from '../services/BackTestService';
import Button from "../../components/common/buttons/Button";
import { useToast, Table, Thead, Tbody, Tr, Th, Td} from "@chakra-ui/react";
import Text from "../../components/common/text/Text";


const TickerList = ({ tickerList, selectedAlgorithmType, amount, validationError }) => {
    const navigate = useNavigate();
    const toast = useToast();

    const handleRunBackTest = async (tickerName, tickerPortfolioType) => {
        if (tickerPortfolioType && selectedAlgorithmType && amount) {
            try {
                const response = await BackTestService.runBackTest(
                    tickerPortfolioType,
                    amount,
                    selectedAlgorithmType,
                    tickerName
                );
                navigate('/backtest-result',
                    { state:
                            {
                                labels: response.data.data.labels,
                                datasets: response.data.data.datasets,
                                tickerName: tickerName,
                                tickerType: tickerName.type,
                                portfolioType: tickerPortfolioType,
                                algorithmType: selectedAlgorithmType
                            }
                    });
            } catch (error) {
                toast({
                    title: "Missing input",
                    description: "Please ensure that Algorithm Type, and Amount are selected.",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
            }
        } else {
            toast({
                title: "Missing input",
                description: "Please ensure that Algorithm Type, and Amount are selected.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    };

    return (
        <div>
            {tickerList.length > 0 ? (
                <Table variant="striped" colorScheme="brand">
                    <Thead>
                    <Tr>
                        <Th>Type</Th>
                        <Th>Name</Th>
                        <Th>Portfolio Type</Th>
                        <Th>BackTest</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {tickerList.map((ticker) => (
                        <Tr key={ticker.id}>
                            <Td>{ticker.tickerType}</Td>
                            <Td>{ticker.tickerName}</Td>
                            <Td>{ticker.portfolioType}</Td>
                            <Td>
                                <Button size="sm" isDisabled={!!validationError}
                                    onClick={() => handleRunBackTest(ticker.tickerName, ticker.portfolioType)}>
                                    Run
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>
            ) : (
                <Text>No tickers available</Text>
            )}
        </div>
    );
};

export default TickerList;
