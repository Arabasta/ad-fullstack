import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ButtonRed = ({ size, variant, children, ...props }) => {
    return (
        <ChakraButton
            size={size}
            variant={variant}
            bg="#b80f0a"
            color="white"
            _hover={{ bg: 'gray.700' }}
            _active={{ bg: 'gray.800' }}
            {...props}
        >
            {children}
        </ChakraButton>
    );
};

ButtonRed.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    variant: PropTypes.oneOf(['solid', 'outline', 'ghost', 'link']),
    children: PropTypes.node.isRequired,
};

ButtonRed.defaultProps = {
    size: 'md',
    variant: 'solid',
};

export default ButtonRed;
