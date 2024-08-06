import React from 'react';
import PropTypes from 'prop-types';

const InfoAlert = ({ message, type, onClose, children, ...props }) => {
    return (
        <div role="alert" {...props}>
            <span>{message}</span>
            {children}
            {onClose && <button onClick={onClose}>Close</button>}
        </div>
    );
};

InfoAlert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['info', 'warning', 'error', 'success']),
    onClose: PropTypes.func,
    children: PropTypes.node,
};

InfoAlert.defaultProps = {
    type: 'info',
    onClose: null,
};

export default InfoAlert;
