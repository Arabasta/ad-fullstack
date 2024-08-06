import React from 'react';
import Button from './Button';

const ButtonBlack = ({ variant, size, type, colorScheme, onClick, href, children, ...props }) => {
    return (
        <Button
            size={size}
            variant={variant}
            colorScheme={colorScheme}
            href={href}
            onClick={onClick}
            bg="black"
            color="white"
            {...props}
        >
            {children}
        </Button>
    );
};

export default ButtonBlack;
