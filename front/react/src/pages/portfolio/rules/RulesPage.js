import React from 'react';
import { useLocation } from 'react-router-dom';
import UpdateRulesByPortfolio from '../../../components/rules/UpdateRulesByPortfolio';
import ResetStopLossTriggerByPortfolio from '../../../components/rules/ResetStopLossTriggerByPortfolio';
import useRule from '../../../hooks/useRule';

const RulesPage = () => {
    const location = useLocation();
    const { portfolioType } = location.state || { portfolioType: 'DEFAULT' };
    const { rule, loading, error, message, updateRule, resetStopLoss } = useRule(portfolioType);

    const handleUpdate = async (updatedRule) => {
        await updateRule(updatedRule);
    };

    const handleReset = async () => {
        await resetStopLoss();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Portfolio Management for {portfolioType}</h1>
            <div className="update-rules-section">
                <UpdateRulesByPortfolio  onUpdate={handleUpdate} rule={rule} />
            </div>
            <div className="reset-stop-loss-section">
                <ResetStopLossTriggerByPortfolio portfolioType={portfolioType} onReset={handleReset} />
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RulesPage;
