import React from 'react';
import { Box } from '@chakra-ui/react';

const GrayBoxCard = ({ children, ...props }) => {
    return (
        <Box
            bg="gray.700"
            p={6}
            borderRadius="lg"
            maxW="500px"
            mx="auto"
            boxShadow="lg"
            {...props}
        >
            {children}
        </Box>
    );
};

export default GrayBoxCard;
