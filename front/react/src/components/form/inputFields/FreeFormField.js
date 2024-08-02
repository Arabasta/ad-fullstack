import React from 'react';
import PropTypes from 'prop-types';

const FreeFormField = ({label, type, value, onChange, placeholder, required}) => {
    return (
        <div>
            {label && <label>{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};


FreeFormField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
};

FreeFormField.defaultProps = {
    label: '',
    type: 'text',
    placeholder: '',
    required: false,
};

export default FreeFormField;