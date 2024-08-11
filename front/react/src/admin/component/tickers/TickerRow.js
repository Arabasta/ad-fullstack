import React, { useState } from 'react';
import { Tr, Td, Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure } from '@chakra-ui/react';

const TickerRow = ({ ticker, deleteTicker }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    const handleDelete = () => {
        deleteTicker(ticker.id);
        onClose();
    };

    return (
        <Tr>
            <Td>{ticker.id}</Td>
            <Td>{ticker.tickerName}</Td>
            <Td>{ticker.tickerType}</Td>
            <Td>{ticker.portfolioType}</Td>
            <Td textAlign="center">
                <Button colorScheme="red" size="sm" onClick={onOpen}>
                    Delete
                </Button>

                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
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
                                <Button ref={cancelRef} onClick={onClose}>
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
