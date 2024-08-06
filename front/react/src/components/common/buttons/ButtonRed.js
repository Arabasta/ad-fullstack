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
            _hover={{ bg: 'gray.700' }}
            _active={{ bg: 'gray.800' }}
            {...props}
        >
            {children}
        </Button>
    );
};

export default ButtonRed;
