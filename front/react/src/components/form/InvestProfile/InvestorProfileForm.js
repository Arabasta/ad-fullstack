import React from 'react';
import FormSelect from "./FormSelect";

const InvestorProfileForm = ({
                                 investmentDurationScore, setInvestmentDurationScore,
                                 withdrawalSpendingPlanScore, setWithdrawalSpendingPlanScore,
                                 investmentKnowledgeScore, setInvestmentKnowledgeScore,
                                 riskRewardScore, setRiskRewardScore,
                                 ownedInvestmentsScore, setOwnedInvestmentsScore,
                                 investmentPersonalityScore, setInvestmentPersonalityScore,
                                 handleSubmit, buttonText, message
                             }) => {
    const options1to4 = [1, 2, 3, 4];
    const options1to3 = [1, 2, 3];

    return (
        <form onSubmit={handleSubmit}>
            <FormSelect
                label="Investment Duration Score"
                value={investmentDurationScore}
                onChange={setInvestmentDurationScore}
                options={options1to4}
                required
            />
            <FormSelect
                label="Withdrawal Spending Plan Score"
                value={withdrawalSpendingPlanScore}
                onChange={setWithdrawalSpendingPlanScore}
                options={options1to4}
                required
            />
            <FormSelect
                label="Investment Knowledge Score"
                value={investmentKnowledgeScore}
                onChange={setInvestmentKnowledgeScore}
                options={options1to4}
                required
            />
            <FormSelect
                label="Risk Reward Score"
                value={riskRewardScore}
                onChange={setRiskRewardScore}
                options={options1to3}
                required
            />
            <FormSelect
                label="Owned Investments Score"
                value={ownedInvestmentsScore}
                onChange={setOwnedInvestmentsScore}
                options={options1to3}
                required
            />
            <FormSelect
                label="Investment Personality Score"
                value={investmentPersonalityScore}
                onChange={setInvestmentPersonalityScore}
                options={options1to4}
                required
            />
            <button type="submit">{buttonText}</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default InvestorProfileForm;
