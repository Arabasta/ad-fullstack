import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    InputGroup,
    InputLeftElement,
    Input,
    Select,
    VStack,
    Box,
    Text,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const AddTickerModal = ({ isOpen, onClose, availableTickers, activeTickers, addTicker }) => {
    const [selectedTicker, setSelectedTicker] = useState(null);
    const [portfolioType, setPortfolioType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTickers, setFilteredTickers] = useState([]);

    useEffect(() => {
        setSelectedTicker(null);
        setPortfolioType('');
        setSearchTerm('');
        setFilteredTickers(availableTickers);
    }, [isOpen, availableTickers]);

    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filtered = availableTickers.filter(ticker =>
            ticker.tickerName.toLowerCase().includes(lowercasedSearchTerm)
        );
        setFilteredTickers(filtered);
    }, [searchTerm, availableTickers]);

    const handleAddTicker = () => {
        if (selectedTicker && portfolioType) {
            addTicker({ ...selectedTicker, portfolioType });
            onClose();
        }
    };

    const isTickerInActiveList = (ticker, portfolioType) => {
        return activeTickers.some(
            (activeTicker) =>
                activeTicker.tickerName === ticker.tickerName &&
                activeTicker.portfolioType === portfolioType
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Ticker</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4} align="stretch">
                        <Box>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <SearchIcon color="gray.300" />
                                </InputLeftElement>
                                <Input
                                    placeholder="Search Tickers"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </InputGroup>
                        </Box>
                        <Box>
                            <Select
                                placeholder="Select Ticker"
                                onChange={(e) => {
                                    const tickerName = e.target.value;
                                    const ticker = filteredTickers.find(t => t.tickerName === tickerName);
                                    setSelectedTicker(ticker || null);
                                }}
                                value={selectedTicker ? selectedTicker.tickerName : ''}
                                isDisabled={filteredTickers.length === 0}
                            >
                                {filteredTickers.length > 0 ? (
                                    filteredTickers.map((ticker) => (
                                        <option key={ticker.tickerName} value={ticker.tickerName}>
                                            {ticker.tickerName} - {ticker.tickerType}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>
                                        No tickers found
                                    </option>
                                )}
                            </Select>
                        </Box>
                        <Box>
                            <Select
                                placeholder="Select Portfolio Type"
                                onChange={(e) => setPortfolioType(e.target.value)}
                                value={portfolioType}
                            >
                                <option value="AGGRESSIVE">Aggressive</option>
                                <option value="MODERATE">Moderate</option>
                                <option value="CONSERVATIVE">Conservative</option>
                            </Select>
                        </Box>
                        {selectedTicker && portfolioType && isTickerInActiveList(selectedTicker, portfolioType) && (
                            <Text color="red.500">This ticker with the selected portfolio type is already active.</Text>
                        )}
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={handleAddTicker}
                        isDisabled={
                            !selectedTicker ||
                            !portfolioType ||
                            isTickerInActiveList(selectedTicker, portfolioType)
                        }
                    >
                        Add Ticker
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddTickerModal;
