import React from 'react';

const RegisterStep5 = ({
                           investmentDurationScore, setInvestmentDurationScore,
                           withdrawalSpendingPlanScore, setWithdrawalSpendingPlanScore,
                           investmentKnowledgeScore, setInvestmentKnowledgeScore,
                           riskRewardScore, setRiskRewardScore,
                           ownedInvestmentsScore, setOwnedInvestmentsScore,
                           investmentPersonalityScore, setInvestmentPersonalityScore,
                           handlePrevious, handleRegister, message
                       }) => {
    return (
        <form onSubmit={handleRegister}>
            <div>
                <label>Investment Duration Score</label>
                <input
                    type="number"
                    value={investmentDurationScore}
                    onChange={(e) => setInvestmentDurationScore(e.target.value)}
                    min="1"
                    max="4"
                    required
                />
            </div>
            <div>
                <label>Withdrawal Spending Plan Score</label>
                <input
                    type="number"
                    value={withdrawalSpendingPlanScore}
                    onChange={(e) => setWithdrawalSpendingPlanScore(e.target.value)}
                    min="1"
                    max="4"
                    required
                />
            </div>
            <div>
                <label>Investment Knowledge Score</label>
                <input
                    type="number"
                    value={investmentKnowledgeScore}
                    onChange={(e) => setInvestmentKnowledgeScore(e.target.value)}
                    min="1"
                    max="4"
                    required
                />
            </div>
            <div>
                <label>Risk Reward Score</label>
                <input
                    type="number"
                    value={riskRewardScore}
                    onChange={(e) => setRiskRewardScore(e.target.value)}
                    min="1"
                    max="3"
                    required
                />
            </div>
            <div>
                <label>Owned Investments Score</label>
                <input
                    type="number"
                    value={ownedInvestmentsScore}
                    onChange={(e) => setOwnedInvestmentsScore(e.target.value)}
                    min="1"
                    max="3"
                    required
                />
            </div>
            <div>
                <label>Investment Personality Score</label>
                <input
                    type="number"
                    value={investmentPersonalityScore}
                    onChange={(e) => setInvestmentPersonalityScore(e.target.value)}
                    min="1"
                    max="4"
                    required
                />
            </div>
            <button type="button" onClick={handlePrevious}>Previous</button>
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default RegisterStep5;