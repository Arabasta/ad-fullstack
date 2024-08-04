import { useState, useEffect } from 'react';
import RulesService from "../services/RulesService";

const useRules = () => {
    const [rules, setRules] = useState({
        portfolioType: '',
        stopLossInitialValue: 0.0,
        stopLoss: 0.0,
        recurringAllocationAmount: 0.0,
        recurringAllocationDay: 0,
    });

    const getRules = async () => {
        try {
            const response = await RulesService.getRules();
            const data = response.data.data;
            setRules({
                portfolioTypeEnum: data.portfolioType,
                stopLossInitialValue: data.stopLossInitialValue,
                stopLoss: data.stopLoss,
                recurringAllocationAmount: data.recurringAllocationAmount,
                recurringAllocationDay: data.recurringAllocationDay,
            });
        } catch (error) {
            console.error('Error fetching rules data', error);
        }
    };

    useEffect(() => {
        getRules();
    }, []); // no dependencies, only run once after initial render

    return { rules, getRules };
};

export default useRules();
