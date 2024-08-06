import React from 'react';
import PropTypes from 'prop-types';
import { Button as ChakraButton } from '@chakra-ui/react';

const Button = ({ bg, color, variant, size, type, colorScheme, onClick, href, children, ...props }) => {
    return (
        <ChakraButton variant={variant}
                    size={size}
                    type={type}
                    colorScheme={colorScheme}
                    href={href}
                    bg={bg}
                    color={color}
                    onClick={onClick}
                    {...props}>
            {children}
        </ChakraButton>
    );
};

Button.propTypes = {
    variant: PropTypes.oneOf(['solid', 'outline', 'ghost', 'link']),
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    colorScheme: PropTypes.string,
    onClick: PropTypes.func,
    href: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Button.defaultProps = {
    variant: 'solid',
    size: 'sm',
    type: 'button',
    onClick: () => {},
};

export default Button;
