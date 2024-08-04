import React, {useEffect, useState} from 'react';
import RulesService from "../../services/RulesService";
import FreeFormField from "../form/inputFields/FreeFormField";

const UpdateRulesByPortfolio = ({ rules, onUpdateRules }) => {
    const [rulesValues, setRulesValues] = useState(rules);

    useEffect(() => {
        setRulesValues(rules);
    }, [rules]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRulesValues({ ...rulesValues, [name]: value });
    };

    const handleRulesUpdate = async () => {
        try {
            // todo: add more robust validation
            if (!rulesValues) {
                alert('You have no rules to update.');
                return;
            }

            await RulesService.updateRulesByPortfolio(rulesValues);
            onUpdateRules();
        } catch (error) {
            console.error('Error updating rules', error);
        }
    };

    return (
        <div>
            <div>
                <FreeFormField
                    label="Stop Loss Initial Value"
                    type="number"
                    name="stopLossInitialValue"
                    value={rulesValues.stopLossInitialValue}
                    onChange={handleInputChange}
                    placeholder="Enter Stop Loss Value"
                />
            </div>
            <div>
                <FreeFormField
                    label="Stop Loss Percentage"
                    type="number"
                    name="stopLossPercentage"
                    value={rulesValues.stopLoss}
                    onChange={handleInputChange}
                    placeholder="Enter Stop Loss Percentage"
                />
            </div>
            <div>
                <FreeFormField
                    label="Recurring Allocation Amount"
                    type="number"
                    name="recurringAllocationAmount"
                    value={rulesValues.recurringAllocationAmount}
                    onChange={handleInputChange}
                    placeholder="Enter recurring amount to allocate to this portfolio"
                />
            </div>
            <div>
                <FreeFormField
                    label="Recurring Allocation Day"
                    type="text"
                    name="recurringAllocationDay"
                    value={rulesValues.recurringAllocationDay}
                    onChange={handleInputChange}
                    placeholder="Enter day for recurring allocation to take place"
                />
            </div>
            <button onClick={handleRulesUpdate}>Update</button>
        </div>
    );
};

export default UpdateRulesByPortfolio;
