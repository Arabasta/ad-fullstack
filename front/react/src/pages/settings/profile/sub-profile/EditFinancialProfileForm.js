import React, { useState, useEffect } from 'react';
import useFinancialProfile from "../../../../hooks/useFinancialProfile";

const employmentStatusOptions = [
    'EMPLOYED',
    'SELF_EMPLOYED',
    'UNEMPLOYED',
    'RETIRED',
    'STUDENT',
    'OTHER'
];

const sourceOfWealthOptions = [
    'SALARY',
    'BUSINESS',
    'INVESTMENTS',
    'INHERITANCE',
    'OTHER'
];

const investmentObjectiveOptions = [
    'GROWTH',
    'INCOME',
    'CAPITAL_PRESERVATION',
    'SPECULATION',
    'OTHER'
];

const investmentExperienceOptions = [
    'NONE',
    'LIMITED',
    'MODERATE',
    'EXTENSIVE'
];

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

const FinancialProfileForm = () => {
    const { financialProfile, loading, error, updateFinancialProfile } = useFinancialProfile();
    const [formData, setFormData] = useState({
        employmentStatus: '',
        annualIncome: '',
        netWorth: '',
        sourceOfWealth: '',
        investmentObjective: '',
        investmentExperience: ''
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        if (financialProfile) {
            setFormData({
                employmentStatus: financialProfile.employmentStatus,
                annualIncome: financialProfile.annualIncome,
                netWorth: financialProfile.netWorth,
                sourceOfWealth: financialProfile.sourceOfWealth,
                investmentObjective: financialProfile.investmentObjective,
                investmentExperience: financialProfile.investmentExperience
            });
        }
    }, [financialProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateFinancialProfile(formData);
            setMessage('Profile updated successfully!');
        } catch (err) {
            setMessage('Error updating profile.');
        }
    };

    const renderOptions = (options) => {
        return options.map(option => (
            <option key={option} value={option}>
                {option.replace('_', ' ')}
            </option>
        ));
    };

    const renderLabeledOptions = (options) => {
        return options.map(option => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Employment Status:</label>
                <select name="employmentStatus" onChange={handleChange} value={formData.employmentStatus}>
                    {renderOptions(employmentStatusOptions, formData.employmentStatus)}
                </select>
            </div>
            <div>
                <label>Annual Income:</label>
                <select name="annualIncome" onChange={handleChange} value={formData.annualIncome}>
                    {renderLabeledOptions(incomeOptions, formData.annualIncome)}
                </select>
            </div>
            <div>
                <label>Net Worth:</label>
                <select name="netWorth" onChange={handleChange} value={formData.netWorth}>
                    {renderLabeledOptions(netWorthOptions, formData.netWorth)}
                </select>
            </div>
            <div>
                <label>Source of Wealth:</label>
                <select name="sourceOfWealth" onChange={handleChange} value={formData.sourceOfWealth}>
                    {renderOptions(sourceOfWealthOptions, formData.sourceOfWealth)}
                </select>
            </div>
            <div>
                <label>Investment Objective:</label>
                <select name="investmentObjective" onChange={handleChange} value={formData.investmentObjective}>
                    {renderOptions(investmentObjectiveOptions, formData.investmentObjective)}
                </select>
            </div>
            <div>
                <label>Investment Experience:</label>
                <select name="investmentExperience" onChange={handleChange} value={formData.investmentExperience}>
                    {renderOptions(investmentExperienceOptions, formData.investmentExperience)}
                </select>
            </div>
            <button type="submit">Update Profile</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default FinancialProfileForm;

