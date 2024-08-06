import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ModalButton = ({ size, variant, children, ...props }) => {
    return (
        <ChakraButton
            size={size}
            variant={variant}
            bg="black"
            color="white"
            _hover={{ bg: 'gray.700' }}
            _active={{ bg: 'gray.800' }}
            {...props}
        >
            {children}
        </ChakraButton>
    );
};

ModalButton.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    variant: PropTypes.oneOf(['solid', 'outline', 'ghost', 'link']),
    children: PropTypes.node.isRequired,
};

ModalButton.defaultProps = {
    size: 'md',
    variant: 'solid',
};

export default ModalButton;
