import { useState, useEffect, useCallback } from 'react';
import RuleService from "../services/RulesService";

const useRule = (portfolioType) => {
    const [rule, setRule] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

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
            await fetchRule();
            setMessage(`Rules updated successfully`);
        } catch (err) {
            setError(err);
            setMessage(`Failed to update rules`);
        } finally {
            setLoading(false);
        }
    };

    const resetStopLoss = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await RuleService.resetStopLoss(portfolioType);
            await fetchRule();
            setMessage(response.message );
        } catch (err) {
            setError(err);
            setMessage(err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRule();
    }, [fetchRule]);

    return { rule, loading, error, message, updateRule, resetStopLoss };
};

export default useRule;
