import React from 'react';
import Text from './Text';

const BlackText = ({ children, ...props }) => {
    return (
        <Text color="black" {...props}>
            {children}
        </Text>
    );
};

export default BlackText;
