import React from 'react';
import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import TickerRow from "./TickerRow";

const TickerTable = ({ activeTickers, loading, deleteTicker }) => {
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
                {!loading &&
                    activeTickers.map((ticker) => (
                        <TickerRow
                            key={ticker.id}
                            ticker={ticker}
                            deleteTicker={deleteTicker}
                        />
                    ))}
            </Tbody>
        </Table>
    );
};

export default TickerTable;
