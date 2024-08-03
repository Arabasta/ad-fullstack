import React, { useState } from 'react';

/**
 * @typedef {Object} FinancialProfile
 * @property {string} employmentStatus
 * @property {number} annualIncome
 * @property {number} netWorth
 * @property {string} sourceOfWealth
 * @property {string} investmentObjective
 * @property {string} investmentExperience
 */

/**
 * @param {{ financialProfile: FinancialProfile, onSubmit: (profile: FinancialProfile) => void }} props
 */
const FinancialProfileForm = ({ financialProfile, onSubmit }) => {
    const [employmentStatus, setEmploymentStatus] = useState(financialProfile.employmentStatus || 'EMPLOYED');
    const [annualIncome, setAnnualIncome] = useState(financialProfile.annualIncome || 0);
    const [netWorth, setNetWorth] = useState(financialProfile.netWorth || 0);
    const [sourceOfWealth, setSourceOfWealth] = useState(financialProfile.sourceOfWealth || 'SALARY');
    const [investmentObjective, setInvestmentObjective] = useState(financialProfile.investmentObjective || 'GROWTH');
    const [investmentExperience, setInvestmentExperience] = useState(financialProfile.investmentExperience || 'NONE');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            employmentStatus,
            annualIncome,
            netWorth,
            sourceOfWealth,
            investmentObjective,
            investmentExperience,
        });
    };

    const incomeOptions = [
        { label: 'Below $20,000', value: 20000 },
        { label: '$20,000 - $50,000', value: 50000 },
        { label: '$50,001 - $100,000', value: 100000 },
        { label: '$100,001 - $200,000', value: 200000 },
        { label: 'Above $200,000', value: 200001 },
    ];

    const netWorthOptions = [
        { label: 'Below $50,000', value: 50000 },
        { label: '$50,000 - $100,000', value: 100000 },
        { label: '$100,001 - $500,000', value: 500000 },
        { label: '$500,001 - $1,000,000', value: 1000000 },
        { label: 'Above $1,000,000', value: 1000001 },
    ];

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Employment Status</label>
                <select
                    value={employmentStatus}
                    onChange={(e) => setEmploymentStatus(e.target.value)}
                >
                    <option value="EMPLOYED">Employed</option>
                    <option value="SELF_EMPLOYED">Self-Employed</option>
                    <option value="UNEMPLOYED">Unemployed</option>
                    <option value="RETIRED">Retired</option>
                    <option value="STUDENT">Student</option>
                    <option value="OTHER">Other</option>
                </select>
            </div>
            <div>
                <label>Annual Income</label>
                <select
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(parseFloat(e.target.value))}
                >
                    {incomeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Net Worth</label>
                <select
                    value={netWorth}
                    onChange={(e) => setNetWorth(parseFloat(e.target.value))}
                >
                    {netWorthOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Source of Wealth</label>
                <select
                    value={sourceOfWealth}
                    onChange={(e) => setSourceOfWealth(e.target.value)}
                >
                    <option value="SALARY">Salary</option>
                    <option value="BUSINESS">Business</option>
                    <option value="INVESTMENTS">Investments</option>
                    <option value="INHERITANCE">Inheritance</option>
                    <option value="OTHER">Other</option>
                </select>
            </div>
            <div>
                <label>Investment Objective</label>
                <select
                    value={investmentObjective}
                    onChange={(e) => setInvestmentObjective(e.target.value)}
                >
                    <option value="GROWTH">Growth</option>
                    <option value="INCOME">Income</option>
                    <option value="CAPITAL_PRESERVATION">Capital Preservation</option>
                    <option value="SPECULATION">Speculation</option>
                    <option value="OTHER">Other</option>
                </select>
            </div>
            <div>
                <label>Investment Experience</label>
                <select
                    value={investmentExperience}
                    onChange={(e) => setInvestmentExperience(e.target.value)}
                >
                    <option value="NONE">None</option>
                    <option value="LIMITED">Limited</option>
                    <option value="MODERATE">Moderate</option>
                    <option value="EXTENSIVE">Extensive</option>
                </select>
            </div>
            <button type="submit">Update</button>
        </form>
    );
};

export default FinancialProfileForm;
