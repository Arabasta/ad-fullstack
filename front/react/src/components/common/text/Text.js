import React from 'react';
import { Text as ChakraText } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Text = ({ variant, color, children, ...props }) => {
    return (
        <ChakraText as={variant}  color={color} {...props}>
            {children}
        </ChakraText>
    );
};

Text.propTypes = {
    variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']),
    color: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Text.defaultProps = {
    variant: 'p',
    color: 'white',
};

export default Text;
