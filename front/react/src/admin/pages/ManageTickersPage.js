import React from 'react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import useTickers from '../hooks/useTickers';
import AddTickerModal from "../component/tickers/AddTickerModal";
import TickerTable from "../component/tickers/TickerTable";

const ManageTickersPage = () => {
    const { activeTickers, availableTickers, loading, addTicker, deleteTicker } = useTickers();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
            <Button colorScheme="teal" onClick={onOpen} mb={4}>
                Add Ticker
            </Button>
            <TickerTable
                activeTickers={activeTickers}
                loading={loading}
                deleteTicker={deleteTicker}
            />
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
