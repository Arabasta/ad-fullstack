import React from 'react';
import { Tr, Td, Button } from '@chakra-ui/react';

const TickerRow = ({ ticker, deleteTicker }) => {
    return (
        <Tr>
            <Td>{ticker.id}</Td>
            <Td>{ticker.tickerName}</Td>
            <Td>{ticker.tickerType}</Td>
            <Td>{ticker.portfolioType}</Td>
            <Td>
                <Button colorScheme="red" onClick={() => deleteTicker(ticker.id)}>
                    Delete
                </Button>
            </Td>
        </Tr>
    );
};

export default TickerRow;
