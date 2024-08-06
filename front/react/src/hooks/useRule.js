import { useState, useEffect, useCallback } from 'react';
import RuleService from "../services/RulesService";

const useRule = (portfolioType) => {
    const [rule, setRule] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRule = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await RuleService.getRule(portfolioType);
            setRule(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [portfolioType]);

    const updateRule = async (ruleData) => {
        setLoading(true);
        setError(null);
        try {
            await RuleService.updateRule(ruleData);
            await fetchRule();  // 更新后重新获取数据
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const resetStopLoss = async () => {
        setLoading(true);
        setError(null);
        try {
            await RuleService.resetStopLoss(portfolioType);
            await fetchRule();  // 重置后重新获取数据
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRule();
    }, [fetchRule]);

    return { rule, loading, error, updateRule, resetStopLoss };
};

export default useRule;
