import React from 'react';

const FormInput = ({ label, value, onChange, min, max, required }) => {
    return (
        <div>
            <label>{label}</label>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                min={min}
                max={max}
                required={required}
            />
        </div>
    );
};

export default FormInput;
