import { useState, useEffect } from 'react';
import RulesService from "../services/RulesService";

const useRulesByPortfolio = (portfolioType=null) => {
    const [rules, setRules] = useState({
        portfolioType: portfolioType,
        stopLossInitialValue: 0.0,
        stopLoss: 0.0,
        recurringAllocationAmount: 0.0,
        recurringAllocationDay: 0,
    });

    const getRulesByPortfolio = async () => {
        try {
            const response = await RulesService.getRulesByPortfolioType();
            const data = response.data.data;
            setRules({
                portfolioType: data.portfolioType,
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
        getRulesByPortfolio();
    }, [portfolioType]);

    return { rules, getRulesByPortfolio };
};

export default useRulesByPortfolio();
