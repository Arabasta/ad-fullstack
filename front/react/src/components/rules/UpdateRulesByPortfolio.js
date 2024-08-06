import React, { useState, useEffect } from 'react';

const UpdateRulesByPortfolio = ({ onUpdate, rule }) => {
    const [formData, setFormData] = useState({});
    const [validationMessage, setValidationMessage] = useState('');

    useEffect(() => {
        if (rule) {
            setFormData(rule);
        }
    }, [rule]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validation logic
        if (name === 'stopLoss') {
            if (value < 0) {
                setValidationMessage('Stop Loss cannot be negative.');
                return;
            } else if (value > 100) {
                setValidationMessage('Stop Loss cannot be greater than 100.');
                return;
            } else {
                setValidationMessage('');
            }
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validationMessage) {
            return; // Prevent form submission if there's a validation message
        }
        onUpdate(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Stop Loss Initial Value:
                    <span>{formData.stopLossInitialValue || ''}</span>
                </label>
            </div>
            <div>
                <label>
                    Stop Loss:
                    <input
                        type="number"
                        name="stopLoss"
                        value={formData.stopLoss || ''}
                        min="0"
                        max="100"
                        onChange={handleChange}
                    />
                </label>
            </div>
            {validationMessage && <p style={{ color: 'red' }}>{validationMessage}</p>}
            <div>
                <label>
                    Recurring Allocation Amount:
                    <input
                        type="number"
                        name="recurringAllocationAmount"
                        value={formData.recurringAllocationAmount || ''}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Recurring Allocation Day:
                    <input
                        type="number"
                        name="recurringAllocationDay"
                        value={formData.recurringAllocationDay || ''}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <button type="submit">Update Rule</button>
        </form>
    );
};

export default UpdateRulesByPortfolio;
