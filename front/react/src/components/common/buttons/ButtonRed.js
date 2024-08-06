import React from 'react';
import Button from './Button';

const ButtonRed = ({ variant, size, type, colorScheme, onClick, href, children, ...props }) => {
    return (
        <Button
            size={size}
            variant={variant}
            colorScheme={colorScheme}
            href={href}
            onClick={onClick}
            bg="red"
            color="white"
            {...props}
        >
            {children}
        </Button>
    );
};

export default ButtonRed;
