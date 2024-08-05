import React from 'react';
import { useLocation } from 'react-router-dom';
import UpdateRulesByPortfolio from '../../../components/rules/UpdateRulesByPortfolio';
import ResetStopLossTriggerByPortfolio from '../../../components/rules/ResetStopLossTriggerByPortfolio';
import useRule from '../../../hooks/useRule';

const RulesPage = () => {
    const location = useLocation();
    const { portfolioType } = location.state || { portfolioType: 'DEFAULT' };
    const { rule, loading, error, updateRule, resetStopLoss } = useRule(portfolioType);

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
            {rule && (
                <table>
                    <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.entries(rule).map(([key, value]) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <div className="update-rules-section">
                <UpdateRulesByPortfolio portfolioType={portfolioType} onUpdate={handleUpdate} />
            </div>
            <div className="reset-stop-loss-section">
                <ResetStopLossTriggerByPortfolio portfolioType={portfolioType} onReset={handleReset} />
            </div>
        </div>
    );
};

export default RulesPage;
