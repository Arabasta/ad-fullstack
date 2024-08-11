export const validateInvestorProfile = (profile) => {
    let error = '';
    let valid = true;

    if (!profile.investmentDurationScore) {
        error = "Investment Duration is required";
        valid = false;
    } else if (!profile.withdrawalSpendingPlanScore) {
        error = "Withdrawal Spending Plan is required";
        valid = false;
    } else if (!profile.investmentKnowledgeScore) {
        error = "Investment Knowledge is required";
        valid = false;
    } else if (!profile.riskRewardScore) {
        error = "Risk Reward is required";
        valid = false;
    } else if (!profile.ownedInvestmentsScore) {
        error = "Owned Investments is required";
        valid = false;
    } else if (!profile.investmentPersonalityScore) {
        error = "Investment Personality is required";
        valid = false;
    }

    return { valid, error };
};
