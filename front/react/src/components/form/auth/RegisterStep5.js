import React from 'react';
import InvestorProfileForm from "../InvestProfile/InvestorProfileForm";
import {Button} from "@chakra-ui/react";

const RegisterStep5 = ({
                           investmentDurationScore, setInvestmentDurationScore,
                           withdrawalSpendingPlanScore, setWithdrawalSpendingPlanScore,
                           investmentKnowledgeScore, setInvestmentKnowledgeScore,
                           riskRewardScore, setRiskRewardScore,
                           ownedInvestmentsScore, setOwnedInvestmentsScore,
                           investmentPersonalityScore, setInvestmentPersonalityScore,
                           handlePrevious, handleRegister, message
                       }) => {
    const optionsForQuestion1 = [
        { label: "Less than 3 years", value: 1 },
        { label: "3-5 years", value: 2 },
        { label: "6-10 years", value: 3 },
        { label: "11 years or more", value: 4 }
    ];
    const optionsForQuestion2 = [
        { label: "Less than 2 years", value: 1 },
        { label: "2-5 years", value: 2 },
        { label: "6-10 years", value: 3 },
        { label: "11 years or more", value: 4 }
    ];
    const optionsForQuestion3 = [
        { label: "None", value: 1 },
        { label: "Limited", value: 2 },
        { label: "Good", value: 3 },
        { label: "Extensive", value: 4 }
    ];
    const optionsForQuestion4 = [
        { label: "Take lower than average risks expecting to earn lower than average returns", value: 1 },
        { label: "Take average risks expecting to earn average returns", value: 2 },
        { label: "Take above average risks expecting to earn above average returns", value: 3 }
    ];
    const optionsForQuestion5 = [
        { label: "Bonds and/or bonds funds", value: 1 },
        { label: "Stocks and/or stocks funds", value: 2 },
        { label: "International securities and/or international funds", value: 3 }
    ];
    const optionsForQuestion6 = [
        { label: "Sell all my shares", value: 1 },
        { label: "Sell some of my shares", value: 2 },
        { label: "Do nothing", value: 3 },
        { label: "Buy more shares", value: 4 }
    ];

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
                optionsForQuestion1={optionsForQuestion1}
                optionsForQuestion2={optionsForQuestion2}
                optionsForQuestion3={optionsForQuestion3}
                optionsForQuestion4={optionsForQuestion4}
                optionsForQuestion5={optionsForQuestion5}
                optionsForQuestion6={optionsForQuestion6}
            />
            <Button type="button" onClick={handlePrevious} variant="outline" colorScheme="gray" size="md" mt={4}>
                Previous
            </Button>
        </div>
    );
};

export default RegisterStep5;
