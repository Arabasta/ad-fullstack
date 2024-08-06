import { Heading as ChakraHeading } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Heading = ({ variant, size, color, children, ...props }) => (
    <ChakraHeading
        as={variant}
        fontSize={size}
        color={color}
        {...props}
    >
        {children}
    </ChakraHeading>
);

Heading.propTypes = {
    variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
    color: PropTypes.string,
    size: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Heading.defaultProps = {
    variant: 'h4',
    size: '1.5rem',
    color: 'black',
};

export default Heading;
