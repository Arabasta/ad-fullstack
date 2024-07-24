import React from 'react';
import PropTypes from 'prop-types';

const Text = ({ variant, children, ...props }) => {
    const Component = variant;
    return <Component {...props}>{children}</Component>;
};

Text.propTypes = {
    variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']),
    children: PropTypes.node.isRequired,
};

Text.defaultProps = {
    variant: 'p',
};

export default Text;
