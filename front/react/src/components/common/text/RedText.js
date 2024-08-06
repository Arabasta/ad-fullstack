import React from 'react';
import Text from './Text';

const RedText = ({ children, ...props }) => {
    return (
        <Text color="red" {...props}>
            {children}
        </Text>
    );
};

export default RedText;
