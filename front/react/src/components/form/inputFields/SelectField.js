import React from 'react';

const SelectField = ({ label, value, onChange, options, required }) => {
    return (
        <div>
            <label>{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value, 10))}
                required={required}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;