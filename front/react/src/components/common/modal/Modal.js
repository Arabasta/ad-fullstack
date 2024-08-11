import { Button, Box, Flex } from '@chakra-ui/react';
import { useState } from "react";
import Heading from "../text/Heading";
import ButtonBlack from "../buttons/ButtonBlack";

const ModalCloseButton = ({ onClick }) => (
    <Button
        onClick={onClick}
        fontSize="1.5rem"
        variant="ghost"
        bg="transparent"
        _hover={{ bg: 'gray.200' }}
        _active={{ bg: 'none' }}
        color="black"
        position="absolute"
        top="10px"
        right="10px"
    >
        ×
    </Button>
);

const ModalOverlay = ({ onClose, children }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            w="100%"
            h="100%"
            bg="rgba(0, 0, 0, 0.5)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            zIndex="1000"
            onClick={handleOverlayClick}
        >
            {children}
        </Box>
    );
};

const ModalContent = ({ onClose, children, ...props }) => (
    <Box
        bg="white"
        borderRadius="8px"
        w="80%"
        maxW="600px"
        maxH="80vh"
        overflowY="auto"
        p="20px"
        boxShadow="0 2px 10px rgba(0, 0, 0, 0.1)"
        position="relative"
        {...props}
    >
        {children}
    </Box>
);

const ModalHeader = ({ title, onClose }) => (
    <Flex justify="space-between"  align="center" mb="20px">
        <Heading align="center" mb="0">
            {title}
        </Heading>
        <ModalCloseButton onClick={onClose} />
    </Flex>
);

const Modal = ({ triggerText, title, onClose, onOpen, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        if(onOpen) onOpen();
    }
    const closeModal = () => {
        setIsOpen(false);
        if (onClose) onClose();
    };
    return (
        <>
            <ButtonBlack onClick={openModal}>
                {triggerText}
            </ButtonBlack>
            {isOpen && (
                <ModalOverlay onClose={closeModal}>
                    <ModalContent onClose={closeModal}>
                        <ModalHeader title={title} onClose={closeModal} />
                        {children}
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    );
};

export { Modal };