import React from 'react';
import { Table, Tbody, Th, Thead, Tr, Text, Td, Box } from '@chakra-ui/react';
import TickerRow from './TickerRow';

const TickerTable = ({ activeTickers, deleteTicker }) => {
    return (
        <Box overflowX="auto" borderWidth="1px" borderRadius="lg" p={4} bg="white" boxShadow="sm">
            <Table variant="simple">
                <Thead bg="gray.100">
                    <Tr>
                        <Th>ID</Th>
                        <Th>Ticker Name</Th>
                        <Th>Ticker Type</Th>
                        <Th>Portfolio</Th>
                        <Th textAlign="center">Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {activeTickers.length > 0 ? (
                        activeTickers.map((ticker) => (
                            <TickerRow
                                key={ticker.id}
                                ticker={ticker}
                                deleteTicker={deleteTicker}
                            />
                        ))
                    ) : (
                        <Tr>
                            <Td colSpan="5">
                                <Text textAlign="center">No active tickers found.</Text>
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </Box>
    );
};

export default TickerTable;
