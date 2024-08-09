import React from 'react';
import PropTypes from 'prop-types';
import {Select} from "@chakra-ui/react";

const FormSelect = ({
                        label, value,
                        onChange, options,
                        required,
                        borderColor='brand.300',
                        inputTextColor='brand.600',
                        dropdownTextColor="",
                        dropdownBackgroundColor="brand.100",
                        selectedInputColor=""
}) => {
    return (
        <div>
            <label>{label}</label>
            <Select
                variant="outline"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value, 10))}
                required={required}
                style={{
                    borderColor: borderColor,
                    color: inputTextColor,
                    backgroundColor: dropdownBackgroundColor,
                }}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        style={{
                            color: value === option.value ? selectedInputColor : dropdownTextColor
                        }}>
                        {option.label}
                    </option>
                ))}
            </Select>
        </div>
    );
};

FormSelect.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })
    ).isRequired,
    required: PropTypes.bool,
    borderColor: PropTypes.string,
    inputTextColor: PropTypes.string,
    dropdownTextColor: PropTypes.string,
    dropdownBackgroundColor: PropTypes.string,
    selectedInputColor: PropTypes.string,
};

export default FormSelect;