import React from 'react';
import PropTypes from 'prop-types';
import { Button as CButton } from '@chakra-ui/react';

/* Buttons Examples:
Login, Logout, Register,
Previous, Next, Last
*/

const Button = ({ variant, size, type, colorScheme, onClick, children, ...props }) => {
    return (
        <CButton variant={variant}
                size={size}
                type={type}
                colorScheme={colorScheme}
                onClick={onClick}
                {...props}>
            {children}
        </CButton>
    );
};

Button.propTypes = {
    variant: PropTypes.oneOf(['solid', 'outline', 'ghost', 'link']),
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    colorScheme: PropTypes.oneOf([]), // todo: include color scheme
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
};

Button.defaultProps = {
    variant:'solid',
    // include default colorScheme
    size:'sm',
    type: 'button',
    onClick: () => {},
};

export default Button;


