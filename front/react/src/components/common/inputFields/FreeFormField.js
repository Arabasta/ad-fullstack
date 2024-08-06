import React from 'react';
import PropTypes from 'prop-types';

const FreeFormField = ({label, type, value, onChange, placeholder, required, color, width, size, borderRadius}) => {
    return (
        <div>
            {label && <label>{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                style={{color, width, fontSize: size, borderRadius}}
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
    color: PropTypes.string,
    width: PropTypes.string,
    size: PropTypes.string,
    borderRadius: PropTypes.string,
};

FreeFormField.defaultProps = {
    label: '',
    type: 'text',
    placeholder: '',
    required: false,
};

export default FreeFormField;