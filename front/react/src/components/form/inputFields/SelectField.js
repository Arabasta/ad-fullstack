import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({ label, value, onChange, options, required }) => {
    return (
        <div>
            <label>{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
        })
    ).isRequired,
    required: PropTypes.bool
};

export default SelectField;
