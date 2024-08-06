import React from 'react';
import FormSelect from "../../common/inputFields/FormSelect";
import {Button} from "@chakra-ui/react";


const InvestorProfileForm = ({
                                 investmentDurationScore, setInvestmentDurationScore,
                                 withdrawalSpendingPlanScore, setWithdrawalSpendingPlanScore,
                                 investmentKnowledgeScore, setInvestmentKnowledgeScore,
                                 riskRewardScore, setRiskRewardScore,
                                 ownedInvestmentsScore, setOwnedInvestmentsScore,
                                 investmentPersonalityScore, setInvestmentPersonalityScore,
                                 handleSubmit, buttonText, message,
                                 optionsForQuestion1, optionsForQuestion2, optionsForQuestion3, optionsForQuestion4, optionsForQuestion5, optionsForQuestion6
                             }) => {
    return (
        <form onSubmit={handleSubmit}>
            <FormSelect
                label="Investment Duration Score"
                value={investmentDurationScore}
                onChange={setInvestmentDurationScore}
                options={optionsForQuestion1}
                required
            />
            <FormSelect
                label="Withdrawal Spending Plan Score"
                value={withdrawalSpendingPlanScore}
                onChange={setWithdrawalSpendingPlanScore}
                options={optionsForQuestion2}
                required
            />
            <FormSelect
                label="Investment Knowledge Score"
                value={investmentKnowledgeScore}
                onChange={setInvestmentKnowledgeScore}
                options={optionsForQuestion3}
                required
            />
            <FormSelect
                label="Risk Reward Score"
                value={riskRewardScore}
                onChange={setRiskRewardScore}
                options={optionsForQuestion4}
                required
            />
            <FormSelect
                label="Owned Investments Score"
                value={ownedInvestmentsScore}
                onChange={setOwnedInvestmentsScore}
                options={optionsForQuestion5}
                required
            />
            <FormSelect
                label="Investment Personality Score"
                value={investmentPersonalityScore}
                onChange={setInvestmentPersonalityScore}
                options={optionsForQuestion6}
                required
            />
            <Button type="submit" variant="solid" colorScheme="blue" size="md">
                {buttonText}
            </Button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default InvestorProfileForm;
