import React from 'react';
import { Input as ChakraInput } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const InputBoxWhite = ({ size, variant, placeholder, fontSize, height, ...props }) => {
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
            fontSize={fontSize}
            height={height}
            {...props}
        />
    );
};

InputBoxWhite.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    variant: PropTypes.oneOf(['outline', 'filled', 'flushed', 'unstyled']),
    placeholder: PropTypes.string,
    fontSize: PropTypes.string,
    height: PropTypes.string,
};

InputBoxWhite.defaultProps = {
    size: 'md',
    variant: 'outline',
    placeholder: '',
    fontSize: 'lg',
    height: 'auto',
};

export default InputBoxWhite;
