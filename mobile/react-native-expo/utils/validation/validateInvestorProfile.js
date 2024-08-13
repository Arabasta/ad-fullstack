export const validateInvestorProfile = (profile) => {
    const validationErrors = {};
    let valid = true;

    if (!profile.investmentDurationScore) {
        validationErrors.investmentDurationScore = "Investment Duration is required";
        valid = false;
    }

    if (!profile.withdrawalSpendingPlanScore) {
        validationErrors.withdrawalSpendingPlanScore = "Withdrawal Spending Plan is required";
        valid = false;
    }

    if (!profile.investmentKnowledgeScore) {
        validationErrors.investmentKnowledgeScore = "Investment Knowledge is required";
        valid = false;
    }

    if (!profile.riskRewardScore) {
        validationErrors.riskRewardScore = "Risk Reward is required";
        valid = false;
    }

    if (!profile.ownedInvestmentsScore) {
        validationErrors.ownedInvestmentsScore = "Owned Investments is required";
        valid = false;
    }

    if (!profile.investmentPersonalityScore) {
        validationErrors.investmentPersonalityScore = "Investment Personality is required";
        valid = false;
    }

    return { valid, validationErrors };
};
