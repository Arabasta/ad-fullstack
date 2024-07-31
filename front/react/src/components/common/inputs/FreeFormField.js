import React from 'react';

const FreeformField = ({ label, value, onChange, min, max, required }) => {
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

export default FreeformField;
