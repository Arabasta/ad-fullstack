export const validateFinancialProfile = (profile) => {
    let valid = true;
    let errorMessage = '';

    if (!profile.employmentStatus) {
        errorMessage = "Employment Status is required";
        valid = false;
    } else if (!profile.annualIncome) {
        errorMessage = "Annual Income is required";
        valid = false;
    } else if (!profile.netWorth) {
        errorMessage = "Net Worth is required";
        valid = false;
    } else if (!profile.sourceOfWealth) {
        errorMessage = "Source of Wealth is required";
        valid = false;
    } else if (!profile.investmentObjective) {
        errorMessage = "Investment Objective is required";
        valid = false;
    } else if (!profile.investmentExperience) {
        errorMessage = "Investment Experience is required";
        valid = false;
    }

    return { valid, errorMessage };
};
