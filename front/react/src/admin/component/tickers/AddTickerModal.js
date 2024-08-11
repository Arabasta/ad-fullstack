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
    Select
} from '@chakra-ui/react';

const AddTickerModal = ({ isOpen, onClose, availableTickers, activeTickers, addTicker }) => {
    const [selectedTicker, setSelectedTicker] = useState(null);
    const [portfolioType, setPortfolioType] = useState('');

    useEffect(() => {
        setSelectedTicker(null);
        setPortfolioType('');
    }, [isOpen]);

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
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Ticker</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Select
                        placeholder="Select Ticker"
                        onChange={(e) =>
                            setSelectedTicker(
                                availableTickers.find(t => t.tickerName === e.target.value)
                            )
                        }
                    >
                        {availableTickers.map((ticker) => (
                            <option key={ticker.tickerName} value={ticker.tickerName}>
                                {ticker.tickerName} - {ticker.tickerType}
                            </option>
                        ))}
                    </Select>
                    <Select
                        mt={4}
                        placeholder="Select Portfolio Type"
                        onChange={(e) => setPortfolioType(e.target.value)}
                        value={portfolioType}
                    >
                        <option value="AGGRESSIVE">Aggressive</option>
                        <option value="MODERATE">Moderate</option>
                        <option value="CONSERVATIVE">Conservative</option>
                    </Select>
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
