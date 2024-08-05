import {useState, useEffect, useCallback} from 'react';
import RulesService from "../services/RulesService";

const useRulesByPortfolio = (portfolioType) => {

    const [rules, setRules] = useState({
        portfolioType: portfolioType,
        stopLossInitialValue: 0.0,
        stopLoss: 0.0,
        recurringAllocationAmount: 0.0,
        recurringAllocationDay: 0,
    });

    const getRulesByPortfolio = useCallback(async () => {
        try {
            const response = await RulesService.getRulesByPortfolioType(portfolioType);
            const data = response?.data?.data;
            if (data) {
                setRules({
                    portfolioType: data.portfolioType,
                    stopLossInitialValue: data.stopLossInitialValue,
                    stopLoss: data.stopLoss,
                    recurringAllocationAmount: data.recurringAllocationAmount,
                    recurringAllocationDay: data.recurringAllocationDay,
                });
            } else {
                console.error('No data found in response');
            }
        } catch (error) {
            console.error('Error fetching rules data', error);
        }
    },[portfolioType]);

    useEffect(() => {
        getRulesByPortfolio();
    }, [getRulesByPortfolio]);

    return { rules, getRulesByPortfolio };
};

export default useRulesByPortfolio;
