import React, { useState } from 'react';
import { Tr, Td, Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';

const TickerRow = ({ ticker, deleteTicker }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const cancelRef = React.useRef();

    const handleDelete = () => {
        deleteTicker(ticker.id);
        setDialogOpen(false);
    };

    return (
        <Tr>
            <Td>{ticker.id}</Td>
            <Td>{ticker.tickerName}</Td>
            <Td>{ticker.tickerType}</Td>
            <Td>{ticker.portfolioType}</Td>
            <Td>
                <Button colorScheme="red" onClick={() => setDialogOpen(true)}>
                    Delete
                </Button>

                <AlertDialog
                    isOpen={isDialogOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={() => setDialogOpen(false)}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Delete Ticker
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                Are you sure you want to delete this ticker?
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={() => setDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button colorScheme="red" onClick={handleDelete} ml={3}>
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Td>
        </Tr>
    );
};

export default TickerRow;
