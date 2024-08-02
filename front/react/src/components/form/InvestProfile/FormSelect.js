import React from 'react';
import PropTypes from 'prop-types';

const FormSelect = ({ label, value, onChange, options, required }) => {
    return (
        <div>
            <label>{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value, 10))}
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

FormSelect.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })
    ).isRequired,
    required: PropTypes.bool,
};

export default FormSelect;