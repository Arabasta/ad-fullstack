import React from 'react';
import { Box, Button, useDisclosure, Spinner, Text } from '@chakra-ui/react';
import useTickers from '../hooks/useTickers';
import TickerTable from "../component/tickers/TickerTable";
import AddTickerModal from "../component/tickers/AddTickerModal";


const ManageTickersPage = () => {
    const { activeTickers, availableTickers, loading, addTicker, deleteTicker } = useTickers();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
            <Button colorScheme="teal" onClick={onOpen} mb={4}>
                Add Ticker
            </Button>
            {loading ? (
                <Spinner size="xl" />
            ) : (
                <TickerTable
                    activeTickers={activeTickers}
                    deleteTicker={deleteTicker}
                />
            )}
            <AddTickerModal
                isOpen={isOpen}
                onClose={onClose}
                availableTickers={availableTickers}
                activeTickers={activeTickers}
                addTicker={addTicker}
            />
        </Box>
    );
};

export default ManageTickersPage;
