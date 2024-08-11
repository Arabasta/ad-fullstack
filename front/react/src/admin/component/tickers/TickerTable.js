import React from 'react';
import {Table, Tbody, Th, Thead, Tr, Text, Td} from '@chakra-ui/react';
import TickerRow from './TickerRow';

const TickerTable = ({ activeTickers, deleteTicker }) => {
    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Ticker Name</Th>
                    <Th>Ticker Type</Th>
                    <Th>Portfolio</Th>
                    <Th>Delete</Th>
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
    );
};

export default TickerTable;
