import React from 'react';
import { Input as ChakraInput } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ModalInput = ({ size, variant, placeholder, ...props }) => {
    return (
        <ChakraInput
            size={size}
            variant={variant}
            placeholder={placeholder}
            color="black"
            bg="white"
            borderColor="black"
            _hover={{ borderColor: 'gray.700' }}
            _focus={{ borderColor: 'gray.700' }}
            _placeholder={{ color: 'gray.500' }}
            {...props}
        />
    );
};

ModalInput.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    variant: PropTypes.oneOf(['outline', 'filled', 'flushed', 'unstyled']),
    placeholder: PropTypes.string,
};

ModalInput.defaultProps = {
    size: 'md',
    variant: 'outline',
    placeholder: '',
};

export default ModalInput;
