import React, { useState } from 'react';
import { Table, Tbody, Th, Thead, Tr, Text, Td, Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import TickerRow from './TickerRow';

const TickerTable = ({ activeTickers, deleteTicker }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTickers = activeTickers.filter((ticker) =>
        ticker.tickerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box overflowX="auto" borderWidth="1px" borderRadius="lg" p={4} bg="white" boxShadow="sm">
            <InputGroup mb={4}>
                <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                    placeholder="Search Ticker Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </InputGroup>
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
                    {filteredTickers.length > 0 ? (
                        filteredTickers.map((ticker) => (
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
