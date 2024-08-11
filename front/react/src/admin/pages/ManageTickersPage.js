import React from 'react';
import { Box, Button, useDisclosure, Spinner, Heading, Flex, Container } from '@chakra-ui/react';
import useTickers from '../hooks/useTickers';
import TickerTable from '../component/tickers/TickerTable';
import AddTickerModal from '../component/tickers/AddTickerModal';

const ManageTickersPage = () => {
    const { activeTickers, availableTickers, loading, addTicker, deleteTicker, fetchActiveTickers } = useTickers();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleAddTicker = async (ticker) => {
        await addTicker(ticker);
        fetchActiveTickers();  // Refresh the list of active tickers after adding a new ticker
        onClose();  // Close the modal
    };

    return (
        <Box bg="#666db3" minH="100vh" py={10}>
            <Container maxW="container.xl" p={4}>
                <Box bg="white" borderRadius="md" p={8} boxShadow="lg" maxW="90%" mx="auto">
                    <Flex justify="space-between" align="center" mb={6}>
                        <Heading as="h1" size="lg" color="#4B4BB3">
                            Manage Tickers
                        </Heading>
                        <Button colorScheme="teal" onClick={onOpen}>
                            Add Ticker
                        </Button>
                    </Flex>
                    {loading ? (
                        <Flex justify="center" align="center" height="200px">
                            <Spinner size="xl" />
                        </Flex>
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
                        addTicker={handleAddTicker}  // Pass the updated handleAddTicker function
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default ManageTickersPage;
