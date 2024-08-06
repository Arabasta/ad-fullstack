import React from 'react';
import { Box } from '@chakra-ui/react';

const WhiteBoxCard = ({ children, ...props }) => {
    return (
        <Box p={4} w="full" textAlign="center" bg="white" borderRadius="md" boxShadow="md" {...props}>
            {children}
        </Box>
    );
};

export default WhiteBoxCard;
