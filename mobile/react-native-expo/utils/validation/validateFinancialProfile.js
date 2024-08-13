export const validateFinancialProfile = (profile) => {
    const validationErrors = {};
    let valid = true;

    if (!profile.employmentStatus) {
        validationErrors.employmentStatus = "Employment Status is required";
        valid = false;
    }

    if (!profile.annualIncome) {
        validationErrors.annualIncome = "Annual Income is required";
        valid = false;
    }

    if (!profile.netWorth) {
        validationErrors.netWorth = "Net Worth is required";
        valid = false;
    }

    if (!profile.sourceOfWealth) {
        validationErrors.sourceOfWealth = "Source of Wealth is required";
        valid = false;
    }

    if (!profile.investmentObjective) {
        validationErrors.investmentObjective = "Investment Objective is required";
        valid = false;
    }

    if (!profile.investmentExperience) {
        validationErrors.investmentExperience = "Investment Experience is required";
        valid = false;
    }

    return { valid, validationErrors };
};
