import React from 'react';
import { Text as ChakraText } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Text = ({ fontSize, variant, color, children, ...props }) => {
    return (
        <ChakraText as={variant}  color={color} fontSize={fontSize} {...props}>
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
    fontSize: 'md',
};

export default Text;
