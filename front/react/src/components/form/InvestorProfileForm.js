import React from 'react';
import FormInput from "../common/inputs/FormInput_Register5";

const InvestorProfileForm = ({
                                 investmentDurationScore, setInvestmentDurationScore,
                                 withdrawalSpendingPlanScore, setWithdrawalSpendingPlanScore,
                                 investmentKnowledgeScore, setInvestmentKnowledgeScore,
                                 riskRewardScore, setRiskRewardScore,
                                 ownedInvestmentsScore, setOwnedInvestmentsScore,
                                 investmentPersonalityScore, setInvestmentPersonalityScore,
                                 handleSubmit, buttonText, message
                             }) => {
    return (
        <form onSubmit={handleSubmit}>
            <FormInput
                label="Investment Duration Score"
                value={investmentDurationScore}
                onChange={setInvestmentDurationScore}
                min="1"
                max="4"
                required
            />
            <FormInput
                label="Withdrawal Spending Plan Score"
                value={withdrawalSpendingPlanScore}
                onChange={setWithdrawalSpendingPlanScore}
                min="1"
                max="4"
                required
            />
            <FormInput
                label="Investment Knowledge Score"
                value={investmentKnowledgeScore}
                onChange={setInvestmentKnowledgeScore}
                min="1"
                max="4"
                required
            />
            <FormInput
                label="Risk Reward Score"
                value={riskRewardScore}
                onChange={setRiskRewardScore}
                min="1"
                max="3"
                required
            />
            <FormInput
                label="Owned Investments Score"
                value={ownedInvestmentsScore}
                onChange={setOwnedInvestmentsScore}
                min="1"
                max="3"
                required
            />
            <FormInput
                label="Investment Personality Score"
                value={investmentPersonalityScore}
                onChange={setInvestmentPersonalityScore}
                min="1"
                max="4"
                required
            />
            <button type="submit">{buttonText}</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default InvestorProfileForm;
