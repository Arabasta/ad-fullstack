import React from 'react';
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

// used in wallet deposit and withdrawal modal (WalletAction.js)
const BoxBorderGray = ({ children, ...props }) => {
    return (
        <Box
            border="2px"
            borderRadius={10}
            borderColor="gray.200"
            p={8}
            w="full"
            h="full"
            {...props}
        >
            {children}
        </Box>
    );
};

BoxBorderGray.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BoxBorderGray;
