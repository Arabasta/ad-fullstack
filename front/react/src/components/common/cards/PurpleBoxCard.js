import React from 'react';
import { Box } from '@chakra-ui/react';

const PurpleBoxCard = ({ children, ...props }) => {
    return (
        <Box
            bg="brand.400"
            p={6}
            borderRadius="lg"
            maxW="700px"
            mx="auto"
            boxShadow="lg"
            {...props}
        >
            {children}
        </Box>
    );
};

export default PurpleBoxCard;
