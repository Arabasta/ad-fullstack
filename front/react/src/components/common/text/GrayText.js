import React from 'react';
import Text from './Text';

const GrayText = ({ children, ...props }) => {
    return (
        <Text color="gray.700" {...props}>
            {children}
        </Text>
    );
};

export default GrayText;
