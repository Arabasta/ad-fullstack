import React from 'react';
import Text from './Text';

const InlineText = ({ children, ...props }) => {
    return (
        <Text display="inline-block" {...props}>
            {children}
        </Text>
    );
};

export default InlineText;
