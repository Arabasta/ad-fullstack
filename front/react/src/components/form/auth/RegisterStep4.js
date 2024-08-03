import React, { useState, useEffect } from 'react';

const RegisterStep4 = ({
                           employmentStatus, setEmploymentStatus, annualIncome, setAnnualIncome, netWorth, setNetWorth,
                           sourceOfWealth, setSourceOfWealth, investmentObjective, setInvestmentObjective, investmentExperience,
                           setInvestmentExperience, handlePrevious, handleNext
                       }) => {

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

    useEffect(() => {
        // Ensure the values are set to valid defaults if not already set
        if (!employmentStatus) setEmploymentStatus('EMPLOYED');
        if (!sourceOfWealth) setSourceOfWealth('SALARY');
        if (!investmentObjective) setInvestmentObjective('GROWTH');
        if (!investmentExperience) setInvestmentExperience('NONE');
    }, [employmentStatus, sourceOfWealth, investmentObjective, investmentExperience]);

    return (
        <form onSubmit={handleNext}>
            <div>
                <label>Employment Status</label>
                <select
                    value={employmentStatus}
                    onChange={(e) => setEmploymentStatus(e.target.value)}
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
                >
                    <option value="NONE">None</option>
                    <option value="LIMITED">Limited</option>
                    <option value="MODERATE">Moderate</option>
                    <option value="EXTENSIVE">Extensive</option>
                </select>
            </div>
            <button type="button" onClick={handlePrevious}>Previous</button>
            <button type="submit">Next</button>
        </form>
    );
};

export default RegisterStep4;
