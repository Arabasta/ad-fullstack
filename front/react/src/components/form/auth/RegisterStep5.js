import React from 'react';
import InvestorProfileForm from "../InvestorProfileForm";

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
        <div>
            <InvestorProfileForm
                investmentDurationScore={investmentDurationScore}
                setInvestmentDurationScore={setInvestmentDurationScore}
                withdrawalSpendingPlanScore={withdrawalSpendingPlanScore}
                setWithdrawalSpendingPlanScore={setWithdrawalSpendingPlanScore}
                investmentKnowledgeScore={investmentKnowledgeScore}
                setInvestmentKnowledgeScore={setInvestmentKnowledgeScore}
                riskRewardScore={riskRewardScore}
                setRiskRewardScore={setRiskRewardScore}
                ownedInvestmentsScore={ownedInvestmentsScore}
                setOwnedInvestmentsScore={setOwnedInvestmentsScore}
                investmentPersonalityScore={investmentPersonalityScore}
                setInvestmentPersonalityScore={setInvestmentPersonalityScore}
                handleSubmit={handleRegister}
                buttonText="Register"
                message={message}
            />
            <button type="button" onClick={handlePrevious}>Previous</button>
        </div>
    );
};

export default RegisterStep5;
