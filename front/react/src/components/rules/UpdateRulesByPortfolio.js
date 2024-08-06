import React, { useState } from 'react';

const UpdateRulesByPortfolio = ({ portfolioType, onUpdate }) => {
    const [stopLossInitialValue, setStopLossInitialValue] = useState('');
    const [stopLoss, setStopLoss] = useState('');
    const [recurringAllocationAmount, setRecurringAllocationAmount] = useState('');
    const [recurringAllocationDay, setRecurringAllocationDay] = useState('');

    const handleUpdate = () => {
        const updatedRule = {
            portfolioType,
            stopLossInitialValue: parseFloat(stopLossInitialValue),
            stopLoss: parseFloat(stopLoss),
            recurringAllocationAmount: parseFloat(recurringAllocationAmount),
            recurringAllocationDay: parseInt(recurringAllocationDay, 10),
        };
        onUpdate(updatedRule);
    };

    return (
        <div>
            <h2>Update Rules for {portfolioType}</h2>
            <div>
                <label>
                    Stop Loss Initial Value:
                    <input
                        type="number"
                        value={stopLossInitialValue}
                        onChange={(e) => setStopLossInitialValue(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Stop Loss:
                    <input
                        type="number"
                        value={stopLoss}
                        onChange={(e) => setStopLoss(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Recurring Allocation Amount:
                    <input
                        type="number"
                        value={recurringAllocationAmount}
                        onChange={(e) => setRecurringAllocationAmount(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Recurring Allocation Day:
                    <input
                        type="number"
                        value={recurringAllocationDay}
                        onChange={(e) => setRecurringAllocationDay(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleUpdate}>Update Rule</button>
        </div>
    );
};

export default UpdateRulesByPortfolio;
