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
                <input
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label>Net Worth</label>
                <input
                    type="number"
                    value={netWorth}
                    onChange={(e) => setNetWorth(parseFloat(e.target.value))}
                />
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
